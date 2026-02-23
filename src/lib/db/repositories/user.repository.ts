import type { User, Prisma } from "@prisma/client";
import { BaseRepository } from "@/lib/db/repositories/base.repository";
import prisma from "@/lib/db/prisma";

/**
 * User Repository
 * Handles all database operations for User entity
 * Extends BaseRepository for common CRUD operations
 */
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(prisma, "user");
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
  }

  /**
   * Find user with accounts (OAuth providers)
   */
  async findWithAccounts(
    id: string,
  ): Promise<(User & { accounts: any[] }) | null> {
    return this.prisma.user.findUnique({
      where: { id },
      // include: {
      //   accounts: true,
      // },
    }) as Promise<(User & { accounts: any[] }) | null>;
  }

  /**
   * Create user with validation
   */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  /**
   * Update user profile
   */
  async updateProfile(id: string, data: any): Promise<User> {
    return this.update(id, data);
  }

  /**
   * Get users with pagination
   */
  async getPaginated(options: {
    page: number;
    pageSize: number;
    role?: string;
  }): Promise<{ users: User[]; total: number }> {
    const { page, pageSize, role } = options;
    const skip = (page - 1) * pageSize;

    const where = role ? { role } : {};

    const [users, total] = await Promise.all([
      this.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      this.count(where),
    ]);

    return { users, total };
  }

  /**
   * Check if email is already taken
   */
  async isEmailTaken(email: string, excludeUserId?: string): Promise<boolean> {
    const where: any = { email };
    if (excludeUserId) {
      where.id = { not: excludeUserId };
    }
    return this.exists(where);
  }

  /**
   * Delete user and cascade related data
   */
  async deleteUser(id: string): Promise<User> {
    // Prisma will handle cascade deletion based on schema
    return this.delete(id);
  }
}

// Export singleton instance
export const userRepository = new UserRepository();
