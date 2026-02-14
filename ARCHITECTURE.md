# Production-Ready Next.js Architecture

## 🏗️ Architecture Overview

This is an enterprise-grade Next.js application built with clean architecture principles, designed to scale to 100k+ users and future-proof for backend migration.

### Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: Auth.js (NextAuth v5)
- **State Management**: TanStack Query
- **UI Components**: shadcn/ui + Tailwind CSS
- **Code Quality**: Biome (linting & formatting)
- **Design Pattern**: Atomic Design

---

## 📁 Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/   # Auth.js endpoints
│   │   └── users/                # User API endpoints
│   ├── providers.tsx             # React Query provider
│   ├── layout.tsx
│   └── page.tsx
│
├── components/                   # Atomic Design
│   ├── atoms/                    # Basic UI elements
│   ├── molecules/                # Simple combinations
│   ├── organisms/                # Complex sections
│   ├── templates/                # Page layouts
│   └── ui/                       # shadcn/ui components
│
├── lib/                          # Core infrastructure
│   ├── auth/                     # Authentication
│   │   ├── auth.config.ts        # Auth.js config
│   │   └── auth.ts               # Auth instance
│   ├── db/                       # Database layer
│   │   ├── prisma.ts             # Prisma client
│   │   └── repositories/         # Data access layer
│   │       ├── base.repository.ts
│   │       └── user.repository.ts
│   ├── services/                 # Business logic layer
│   │   ├── base.service.ts
│   │   └── user.service.ts
│   ├── api/                      # API utilities
│   │   └── error-handler.ts
│   └── utils/                    # Utilities
│       ├── errors.ts
│       └── utils.ts
│
├── hooks/                        # React hooks
│   └── queries/                  # TanStack Query hooks
│       └── use-user.ts
│
├── types/                        # TypeScript types
│   ├── api.types.ts
│   ├── auth.types.ts
│   ├── database.types.ts
│   └── index.ts
│
└── prisma/                       # Database schema
    └── schema.prisma
```

---

## 🎯 Separation of Concerns

### Layer Architecture

```
┌─────────────────────────────────────────┐
│         UI Layer (Components)            │
│  - Only presentation logic               │
│  - No business logic                     │
│  - No direct database access             │
└──────────────┬──────────────────────────┘
               │ uses hooks
┌──────────────▼──────────────────────────┐
│      State Management (Hooks)            │
│  - TanStack Query hooks                  │
│  - Calls API endpoints                   │
└──────────────┬──────────────────────────┘
               │ HTTP requests
┌──────────────▼──────────────────────────┐
│         API Layer (Routes)               │
│  - HTTP request handling                 │
│  - Authentication checks                 │
│  - Calls services                        │
└──────────────┬──────────────────────────┘
               │ calls
┌──────────────▼──────────────────────────┐
│      Service Layer (Business Logic)      │
│  - Validation                            │
│  - Business rules                        │
│  - Orchestration                         │
│  - Calls repositories                    │
└──────────────┬──────────────────────────┘
               │ calls
┌──────────────▼──────────────────────────┐
│    Repository Layer (Data Access)        │
│  - Database operations                   │
│  - Prisma queries                        │
│  - Data mapping                          │
└──────────────┬──────────────────────────┘
               │ uses
┌──────────────▼──────────────────────────┐
│         Database (PostgreSQL)            │
└─────────────────────────────────────────┘
```

### Key Principles

1. **No Prisma in Components**: Components never import Prisma directly
2. **No Business Logic in UI**: All business logic lives in services
3. **Repository Pattern**: All database access goes through repositories
4. **Type Safety**: Fully typed end-to-end
5. **Single Responsibility**: Each layer has one clear purpose

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- npm or pnpm

### Installation

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your database credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/kol_tools_db"
AUTH_SECRET="your-secret-key"
```

3. **Generate Prisma client**:
```bash
npx prisma generate
```

4. **Run database migrations**:
```bash
npx prisma migrate dev --name init
```

5. **Start development server**:
```bash
npm run dev
```

---

## 📝 Usage Examples

### Using TanStack Query Hooks in Components

```typescript
"use client";

import { useUsers, useCreateUser } from "@/hooks/queries/use-user";

export function UserList() {
  // Fetch users with automatic caching
  const { data, isLoading } = useUsers({ page: 1, pageSize: 10 });

  // Create user mutation
  const createUser = useCreateUser();

  const handleCreate = () => {
    createUser.mutate({
      email: "user@example.com",
      name: "John Doe",
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={handleCreate}>Create User</button>
    </div>
  );
}
```

### Creating a New Service

```typescript
// src/lib/services/product.service.ts
import { BaseService } from "./base.service";
import { productRepository } from "../db/repositories/product.repository";

export class ProductService extends BaseService {
  async getProduct(id: string) {
    return this.execute(async () => {
      const product = await productRepository.findById(id);
      if (!product) throw new NotFoundError("Product");
      return product;
    }, "Failed to get product");
  }
}

export const productService = new ProductService();
```

### Creating a New Repository

```typescript
// src/lib/db/repositories/product.repository.ts
import { BaseRepository } from "./base.repository";
import prisma from "../prisma";

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(prisma, "product");
  }

  async findByCategory(category: string) {
    return this.findMany({ where: { category } });
  }
}

export const productRepository = new ProductRepository();
```

---

## 🔐 Authentication

### Protected Routes

Routes are protected using middleware:

```typescript
// middleware.ts
export default auth((req) => {
  // Protect /dashboard routes
  if (req.nextUrl.pathname.startsWith("/dashboard") && !req.auth) {
    return Response.redirect(new URL("/login", req.url));
  }
});
```

### Using Auth in Components

```typescript
import { auth } from "@/lib/auth/auth";

export default async function DashboardPage() {
  const session = await auth();
  
  return <div>Welcome {session?.user?.name}</div>;
}
```

---

## 🧪 Database Operations

### Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Open Prisma Studio
npx prisma studio

# Reset database (development only)
npx prisma migrate reset
```

---

## 🎨 Adding shadcn/ui Components

```bash
# Add individual components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form

# Components will be added to src/components/ui/
```

---

## 🔄 Migration Path to Go Backend

When ready to migrate to Go:

1. **Keep API contracts** - Types remain unchanged
2. **Replace API routes** - Go HTTP handlers replace Next.js API routes
3. **Reimplement services** - Same business logic in Go
4. **Reimplement repositories** - Different ORM, same interface
5. **Frontend unchanged** - Components still use same hooks

**Zero component changes needed!**

---

## 📊 Performance Considerations

- **Connection Pooling**: Configured in Prisma client
- **Query Caching**: TanStack Query handles automatic caching
- **Optimistic Updates**: Built into mutation hooks
- **Stale-While-Revalidate**: Default query behavior

---

## 🛡️ Security Features

- Session-based authentication via Auth.js
- Route protection via middleware
- Input validation with Zod (ready to add)
- SQL injection protection via Prisma
- CSRF protection built-in

---

## 📦 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run Biome linter
npm run format       # Format code with Biome
```

---

## 🏗️ Adding New Features

### 1. Create Database Model

```prisma
// prisma/schema.prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  price       Float
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 2. Create Repository

```typescript
// src/lib/db/repositories/product.repository.ts
export class ProductRepository extends BaseRepository<Product> {
  // Add custom queries
}
```

### 3. Create Service

```typescript
// src/lib/services/product.service.ts
export class ProductService extends BaseService {
  // Add business logic
}
```

### 4. Create API Route

```typescript
// src/app/api/products/route.ts
export async function GET() {
  const products = await productService.getProducts();
  return successResponse(products);
}
```

### 5. Create Query Hook

```typescript
// src/hooks/queries/use-product.ts
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetch("/api/products").then(r => r.json()),
  });
}
```

### 6. Use in Component

```typescript
// src/components/organisms/ProductList.tsx
export function ProductList() {
  const { data } = useProducts();
  // Render products
}
```

---

## 🎯 Best Practices

1. **Always use repositories** - Never call Prisma directly from services
2. **Keep services thin** - One service per entity
3. **Use TypeScript strictly** - No `any` types
4. **Follow Atomic Design** - Components in correct folders
5. **Invalidate queries** - After mutations for fresh data
6. **Handle errors** - Use custom error classes
7. **Validate input** - In services, not components

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Auth.js Documentation](https://authjs.dev)
- [TanStack Query Documentation](https://tanstack.com/query)
- [shadcn/ui Documentation](https://ui.shadcn.com)

---

## 🤝 Contributing

1. Follow the established architecture patterns
2. Add tests for new features
3. Update documentation
4. Run linter before committing

---

## 📄 License

MIT
