import { NextResponse } from "next/server";
import { AppError } from "@/lib/utils/errors";

/**
 * API Error Handler
 * Converts errors to consistent JSON responses
 */
export function handleApiError(error: unknown): NextResponse {
  console.error("API Error:", error);

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: {
          message: error.message,
          code: error.code,
          statusCode: error.statusCode,
        },
      },
      { status: error.statusCode },
    );
  }

  // Unknown error
  return NextResponse.json(
    {
      error: {
        message: "Internal server error",
        code: "INTERNAL_SERVER_ERROR",
        statusCode: 500,
      },
    },
    { status: 500 },
  );
}

/**
 * Success response helper
 */
export function successResponse<T>(
  data: T,
  status: number = 200,
): NextResponse {
  return NextResponse.json({ data }, { status });
}
