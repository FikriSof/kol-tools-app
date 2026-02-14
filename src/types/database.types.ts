/**
 * Database Types
 * Re-export Prisma types for use throughout the application
 */

export type { User, Account, Session, UserRole } from "@prisma/client";

/**
 * User with relations
 */
export interface UserWithAccounts {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: string;
  accounts: Account[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Pagination types
 */
export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
