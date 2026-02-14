import type { PrismaClient } from "@prisma/client";

/**
 * Base Repository Pattern
 * Provides common CRUD operations for all entities
 * Abstracts Prisma from the rest of the application
 */
export abstract class BaseRepository<T> {
  protected prisma: PrismaClient;
  protected modelName: string;

  constructor(prisma: PrismaClient, modelName: string) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  /**
   * Find a single record by ID
   */
  async findById(id: string): Promise<T | null> {
    const model = this.getModel();
    return model.findUnique({
      where: { id },
    }) as Promise<T | null>;
  }

  /**
   * Find a single record by criteria
   */
  async findOne(where: Record<string, unknown>): Promise<T | null> {
    const model = this.getModel();
    return model.findFirst({
      where,
    }) as Promise<T | null>;
  }

  /**
   * Find multiple records with optional filtering
   */
  async findMany(options?: {
    where?: Record<string, unknown>;
    skip?: number;
    take?: number;
    orderBy?: Record<string, unknown>;
  }): Promise<T[]> {
    const model = this.getModel();
    return model.findMany(options) as Promise<T[]>;
  }

  /**
   * Create a new record
   */
  async create(data: Partial<T>): Promise<T> {
    const model = this.getModel();
    return model.create({
      data,
    }) as Promise<T>;
  }

  /**
   * Update a record by ID
   */
  async update(id: string, data: Partial<T>): Promise<T> {
    const model = this.getModel();
    return model.update({
      where: { id },
      data,
    }) as Promise<T>;
  }

  /**
   * Delete a record by ID
   */
  async delete(id: string): Promise<T> {
    const model = this.getModel();
    return model.delete({
      where: { id },
    }) as Promise<T>;
  }

  /**
   * Count records matching criteria
   */
  async count(where?: Record<string, unknown>): Promise<number> {
    const model = this.getModel();
    return model.count({ where });
  }

  /**
   * Check if a record exists
   */
  async exists(where: Record<string, unknown>): Promise<boolean> {
    const count = await this.count(where);
    return count > 0;
  }

  /**
   * Get the Prisma model for this repository
   */
  protected getModel(): any {
    return (this.prisma as any)[this.modelName];
  }
}
