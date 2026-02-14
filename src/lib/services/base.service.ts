/**
 * Base Service Class
 * Provides common functionality for all services
 * Handles error wrapping and logging
 */

import { AppError } from "@/lib/utils/errors";

export abstract class BaseService {
  /**
   * Execute a service operation with error handling
   */
  protected async execute<T>(
    operation: () => Promise<T>,
    errorMessage: string = "Operation failed",
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      // If it's already an AppError, rethrow it
      if (error instanceof AppError) {
        throw error;
      }

      // Log the error (in production, send to monitoring service)
      console.error(`[${this.constructor.name}] ${errorMessage}:`, error);

      // Wrap unknown errors
      throw new AppError(errorMessage, 500, "INTERNAL_SERVER_ERROR");
    }
  }

  /**
   * Validate required fields
   */
  protected validateRequired(
    data: Record<string, any>,
    fields: string[],
  ): void {
    const missing = fields.filter((field) => !data[field]);
    if (missing.length > 0) {
      throw new AppError(
        `Missing required fields: ${missing.join(", ")}`,
        400,
        "VALIDATION_ERROR",
      );
    }
  }
}
