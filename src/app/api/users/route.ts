import { NextRequest } from "next/server";
import { userService } from "@/lib/services/user.service";
import { handleApiError, successResponse } from "@/lib/api/error-handler";
import { auth } from "@/lib/auth/auth";

/**
 * GET /api/users
 * Get paginated list of users
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return handleApiError(new Error("Unauthorized"));
    }

    const searchParams = request.nextUrl.searchParams;
    const page = Number.parseInt(searchParams.get("page") || "1");
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "10");
    const role = searchParams.get("role") || undefined;

    const result = await userService.getUsers({ page, pageSize, role });

    return successResponse(result);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/users
 * Create a new user
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const user = await userService.createUser({
      email: body.email,
      name: body.name,
      password: body.password,
      image: body.image,
    });

    return successResponse(user, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
