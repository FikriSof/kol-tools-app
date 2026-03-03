import type { NextRequest } from "next/server";
import { creatorService } from "@/lib/services/creator.service";
import { handleApiError, successResponse } from "@/lib/api/error-handler";
import { auth } from "@/lib/auth/auth";
import { UnauthorizedError } from "@/lib/utils/errors";

/**
 * GET /api/creators/[id]
 * Get a single creator with related agency and contact info
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return handleApiError(new UnauthorizedError());
    }

    const { id } = await params;
    const creator = await creatorService.getCreatorById(id);

    return successResponse(creator);
  } catch (error) {
    return handleApiError(error);
  }
}
