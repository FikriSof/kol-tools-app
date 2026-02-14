/**
 * API Types
 * Request and response types for API endpoints
 */

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
}

/**
 * API error response
 */
export interface ApiErrorResponse {
  error: {
    message: string;
    code: string;
    statusCode: number;
  };
}

/**
 * User API types
 */
export interface CreateUserRequest {
  email: string;
  name?: string;
  password?: string;
  image?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  image?: string;
}

export interface GetUsersQuery {
  page?: number;
  pageSize?: number;
  role?: string;
}
