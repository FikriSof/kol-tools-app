import type { NextRequest } from "next/server";
import { creatorService } from "@/lib/services/creator.service";
import { handleApiError, successResponse } from "@/lib/api/error-handler";
import { auth } from "@/lib/auth/auth";
import { UnauthorizedError } from "@/lib/utils/errors";

/**
 * GET /api/creators
 * Get paginated list of creators with optional search
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return handleApiError(new UnauthorizedError());
    }

    const searchParams = request.nextUrl.searchParams;
    const page = Number.parseInt(searchParams.get("page") || "1");
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "10");
    const search = searchParams.get("search") || undefined;

    const result = await creatorService.getCreators({ page, pageSize, search });

    return successResponse(result);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/creators
 * Create a new creator
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return handleApiError(new UnauthorizedError());
    }

    const body = await request.json();

    const creator = await creatorService.createCreator({
      name: body.name,
      tiktok_username: body.tiktok_username,
      tiktok_profile_url: body.tiktok_profile_url,
      city: body.city,
      country: body.country,
      content_language: body.content_language,
      agency_id: body.agency_id,
    });

    return successResponse(creator, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
