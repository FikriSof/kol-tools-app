# Separation of Concerns Guide

## Overview

This document explains how the application maintains strict separation of concerns across different layers.

---

## Layer Responsibilities

### 1. UI Layer (Components)

**Location**: `src/components/`

**Responsibilities**:
- Render UI elements
- Handle user interactions
- Display data
- Trigger actions via hooks

**Can Do**:
- Import and use hooks
- Import and use other components
- Handle local UI state (useState)
- Trigger mutations

**Cannot Do**:
- Import services directly
- Import repositories
- Import Prisma client
- Contain business logic
- Make direct database calls

**Example**:
```typescript
// ✅ CORRECT
"use client";

import { useUsers } from "@/hooks/queries/use-user";

export function UserList() {
  const { data, isLoading } = useUsers();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {data?.users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// ❌ WRONG
import { userService } from "@/lib/services/user.service"; // NO!
import prisma from "@/lib/db/prisma"; // NO!
```

---

### 2. Hooks Layer (State Management)

**Location**: `src/hooks/`

**Responsibilities**:
- Manage server state with TanStack Query
- Call API endpoints
- Handle caching and invalidation
- Provide data to components

**Can Do**:
- Use TanStack Query
- Call API routes via fetch
- Handle loading/error states
- Invalidate queries

**Cannot Do**:
- Import services directly
- Import repositories
- Import Prisma client
- Contain business logic

**Example**:
```typescript
// ✅ CORRECT
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users");
      return res.json();
    },
  });
}

// ❌ WRONG
import { userService } from "@/lib/services/user.service"; // NO!
```

---

### 3. API Layer (Routes)

**Location**: `src/app/api/`

**Responsibilities**:
- Handle HTTP requests
- Validate authentication
- Parse request body
- Call services
- Return HTTP responses

**Can Do**:
- Import and use services
- Check authentication
- Parse request data
- Return JSON responses
- Handle errors

**Cannot Do**:
- Import repositories directly
- Import Prisma client directly
- Contain business logic

**Example**:
```typescript
// ✅ CORRECT
import { userService } from "@/lib/services/user.service";
import { auth } from "@/lib/auth/auth";

export async function GET() {
  const session = await auth();
  if (!session) return new Response("Unauthorized", { status: 401 });
  
  const users = await userService.getUsers({ page: 1, pageSize: 10 });
  return Response.json({ data: users });
}

// ❌ WRONG
import { userRepository } from "@/lib/db/repositories/user.repository"; // NO!
import prisma from "@/lib/db/prisma"; // NO!

export async function GET() {
  const users = await prisma.user.findMany(); // NO!
}
```

---

### 4. Service Layer (Business Logic)

**Location**: `src/lib/services/`

**Responsibilities**:
- Implement business rules
- Validate data
- Orchestrate operations
- Transform data
- Call repositories

**Can Do**:
- Import and use repositories
- Validate input
- Implement business logic
- Combine data from multiple repositories
- Throw custom errors

**Cannot Do**:
- Import Prisma client directly
- Know about HTTP requests/responses
- Know about React components

**Example**:
```typescript
// ✅ CORRECT
import { BaseService } from "./base.service";
import { userRepository } from "../db/repositories/user.repository";
import { ConflictError, ValidationError } from "../utils/errors";

export class UserService extends BaseService {
  async createUser(data: { email: string; name?: string }) {
    return this.execute(async () => {
      // Validation (business logic)
      if (!this.isValidEmail(data.email)) {
        throw new ValidationError("Invalid email");
      }

      // Check business rule
      const exists = await userRepository.isEmailTaken(data.email);
      if (exists) {
        throw new ConflictError("Email already in use");
      }

      // Create via repository
      return userRepository.createUser(data);
    }, "Failed to create user");
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

// ❌ WRONG
import prisma from "../db/prisma"; // NO!

export class UserService {
  async createUser(data: any) {
    return prisma.user.create({ data }); // NO!
  }
}
```

---

### 5. Repository Layer (Data Access)

**Location**: `src/lib/db/repositories/`

**Responsibilities**:
- Execute database queries
- Map database results
- Abstract Prisma operations
- Provide data access interface

**Can Do**:
- Import and use Prisma client
- Execute queries
- Transform database results
- Provide CRUD operations

**Cannot Do**:
- Contain business logic
- Validate business rules
- Know about HTTP or UI

**Example**:
```typescript
// ✅ CORRECT
import { BaseRepository } from "./base.repository";
import prisma from "../prisma";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(prisma, "user");
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
  }

  async isEmailTaken(email: string, excludeId?: string): Promise<boolean> {
    const where: any = { email };
    if (excludeId) {
      where.id = { not: excludeId };
    }
    return this.exists(where);
  }
}

// ❌ WRONG
export class UserRepository {
  async createUser(email: string) {
    // Business logic doesn't belong here!
    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }
    
    return prisma.user.create({ data: { email } });
  }
}
```

---

## Data Flow Examples

### Example 1: Fetching Users

```
Component (UserList.tsx)
    ↓ uses hook
Hook (useUsers)
    ↓ calls API
API Route (GET /api/users)
    ↓ calls service
Service (userService.getUsers)
    ↓ calls repository
Repository (userRepository.findMany)
    ↓ uses Prisma
Database (PostgreSQL)
```

### Example 2: Creating a User

```
Component (CreateUserForm.tsx)
    ↓ triggers mutation
Hook (useCreateUser)
    ↓ POST to API
API Route (POST /api/users)
    ↓ calls service
Service (userService.createUser)
    ↓ validates email
    ↓ checks if email exists (repository)
    ↓ creates user (repository)
Repository (userRepository.createUser)
    ↓ uses Prisma
Database (PostgreSQL)
```

---

## Why This Matters

### 1. **Testability**
Each layer can be tested in isolation:
- Services can be tested without a database (mock repositories)
- Repositories can be tested without business logic
- Components can be tested without backend (mock hooks)

### 2. **Maintainability**
- Changes to database don't affect services
- Changes to business logic don't affect UI
- Clear boundaries make debugging easier

### 3. **Scalability**
- Services can be extracted to microservices
- Database can be swapped (change repositories only)
- Frontend can be separated (API stays the same)

### 4. **Migration Path**
When migrating to Go backend:
- **Keep**: API contracts, types, frontend
- **Replace**: API routes, services, repositories
- **No changes needed**: Components, hooks

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Prisma in Components
```typescript
// WRONG
import prisma from "@/lib/db/prisma";

export function UserList() {
  const users = await prisma.user.findMany(); // NO!
}
```

### ❌ Mistake 2: Business Logic in API Routes
```typescript
// WRONG
export async function POST(req: Request) {
  const { email } = await req.json();
  
  // Business logic doesn't belong here!
  if (!email.includes("@")) {
    return Response.json({ error: "Invalid email" });
  }
  
  const user = await prisma.user.create({ data: { email } });
}
```

### ❌ Mistake 3: Services in Components
```typescript
// WRONG
import { userService } from "@/lib/services/user.service";

export function UserList() {
  const users = await userService.getUsers(); // NO!
}
```

### ❌ Mistake 4: Business Logic in Repositories
```typescript
// WRONG
export class UserRepository {
  async createUser(email: string) {
    // Validation is business logic!
    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }
    
    return prisma.user.create({ data: { email } });
  }
}
```

---

## Checklist for New Features

When adding a new feature, follow this checklist:

- [ ] **Database Model**: Add to `prisma/schema.prisma`
- [ ] **Repository**: Create in `src/lib/db/repositories/`
  - Extends BaseRepository
  - Only database operations
  - No business logic
- [ ] **Service**: Create in `src/lib/services/`
  - Extends BaseService
  - Contains business logic
  - Uses repositories
  - No Prisma imports
- [ ] **API Route**: Create in `src/app/api/`
  - Handles HTTP
  - Uses services
  - No repositories or Prisma
- [ ] **Types**: Add to `src/types/`
  - Request/response types
  - Database types
- [ ] **Hook**: Create in `src/hooks/queries/`
  - Uses TanStack Query
  - Calls API routes
  - No services or repositories
- [ ] **Component**: Create in `src/components/`
  - Uses hooks
  - No services, repositories, or Prisma
  - Follows Atomic Design

---

## Summary

**Remember the golden rules**:

1. **Components** → use **Hooks**
2. **Hooks** → call **API Routes**
3. **API Routes** → use **Services**
4. **Services** → use **Repositories**
5. **Repositories** → use **Prisma**

**Never skip layers!**
