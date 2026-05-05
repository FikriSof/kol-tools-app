import type { User } from "@prisma/client";
import { userRepository } from "@/lib/db/repositories/user.repository";
import { BaseService } from "@/lib/services/base.service";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "@/lib/utils/errors";

/**
 * User Service
 * Contains all business logic for user operations
 * No direct Prisma usage - all database operations go through repository
 */
export class UserService extends BaseService {
  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User> {
    return this.execute(async () => {
      const user = await userRepository.findById(id);
      if (!user) {
        throw new NotFoundError("User");
      }
      return user;
    }, "Failed to get user");
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<User | null> {
    return this.execute(async () => {
      return userRepository.findByEmail(email);
    }, "Failed to get user by email");
  }

  /**
   * Get paginated users
   */
  async getUsers(options: {
    page?: number;
    pageSize?: number;
    role?: string;
  }): Promise<{
    users: User[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    return this.execute(async () => {
      const page = options.page || 1;
      const pageSize = options.pageSize || 10;

      const { users, total } = await userRepository.getPaginated({
        page,
        pageSize,
        role: options.role,
      });

      return {
        users,
        total,
        page,
        pageSize,
      };
    }, "Failed to get users");
  }

  /**
   * Create a new user
   */
  async createUser(data: {
    email: string;
    name?: string;
    password?: string;
    image?: string;
  }): Promise<User> {
    return this.execute(async () => {
      // Validate email
      if (!this.isValidEmail(data.email)) {
        throw new ValidationError("Invalid email format");
      }

      // Check if email is already taken
      const emailTaken = await userRepository.isEmailTaken(data.email);
      if (emailTaken) {
        throw new ConflictError("Email already in use");
      }

      // Create user
      return userRepository.createUser({
        email: data.email,
        password_hash: data.password || "", // In production, hash this first
        // name: data.name,
        // image: data.image,
      } as any);
    }, "Failed to create user");
  }

  /**
   * Update user profile
   */
  async updateUser(
    id: string,
    data: {
      name?: string;
      email?: string;
      image?: string;
    },
  ): Promise<User> {
    return this.execute(async () => {
      // Check if user exists
      const user = await userRepository.findById(id);
      if (!user) {
        throw new NotFoundError("User");
      }

      // If email is being updated, check if it's available
      if (data.email && data.email !== user.email) {
        if (!this.isValidEmail(data.email)) {
          throw new ValidationError("Invalid email format");
        }

        const emailTaken = await userRepository.isEmailTaken(data.email, id);
        if (emailTaken) {
          throw new ConflictError("Email already in use");
        }
      }

      // Update user
      const updateData: any = {};
      if (data.email) updateData.email = data.email;
      // if (data.name) updateData.name = data.name;
      // if (data.image) updateData.image = data.image;

      return userRepository.updateProfile(id, updateData);
    }, "Failed to update user");
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<void> {
    return this.execute(async () => {
      const user = await userRepository.findById(id);
      if (!user) {
        throw new NotFoundError("User");
      }

      await userRepository.deleteUser(id);
    }, "Failed to delete user");
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Export singleton instance
export const userService = new UserService();
