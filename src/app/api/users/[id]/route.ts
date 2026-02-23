import { NextRequest } from "next/server";
import { userService } from "@/lib/services/user.service";
import { handleApiError, successResponse } from "@/lib/api/error-handler";
import { auth } from "@/lib/auth/auth";

export const dynamic = "force-dynamic";

/**
 * GET /api/users/[id]
 * Get user by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return handleApiError(new Error("Unauthorized"));
    }

    const { id } = await params;
    const user = await userService.getUserById(id);

    return successResponse(user);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PATCH /api/users/[id]
 * Update user
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return handleApiError(new Error("Unauthorized"));
    }

    const { id } = await params;
    const body = await request.json();

    const user = await userService.updateUser(id, {
      name: body.name,
      email: body.email,
      image: body.image,
    });

    return successResponse(user);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/users/[id]
 * Delete user
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return handleApiError(new Error("Unauthorized"));
    }

    const { id } = await params;
    await userService.deleteUser(id);

    return successResponse({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
