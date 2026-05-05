import type { Creator } from "@prisma/client";
import { creatorRepository } from "@/lib/db/repositories/creator.repository";
import { BaseService } from "@/lib/services/base.service";
import { ConflictError, NotFoundError } from "@/lib/utils/errors";

/**
 * Creator Service
 * Contains all business logic for creator operations
 */
export class CreatorService extends BaseService {
  /**
   * Get paginated list of creators with optional search
   */
  async getCreators(options: {
    page?: number;
    pageSize?: number;
    search?: string;
  }) {
    return this.execute(async () => {
      const page = options.page || 1;
      const pageSize = options.pageSize || 10;

      const { creators, total } = await creatorRepository.getPaginated({
        page,
        pageSize,
        search: options.search,
      });

      return { creators, total, page, pageSize };
    }, "Failed to get creators");
  }

  /**
   * Get single creator by ID with relations
   */
  async getCreatorById(id: string) {
    return this.execute(async () => {
      const creator = await creatorRepository.findByIdWithRelations(id);
      if (!creator) {
        throw new NotFoundError("Creator");
      }
      return creator;
    }, "Failed to get creator");
  }

  /**
   * Create a new creator
   */
  async createCreator(data: {
    name: string;
    tiktok_username: string;
    tiktok_profile_url: string;
    city?: string;
    country?: string;
    content_language?: string;
    agency_id?: string;
  }): Promise<Creator> {
    return this.execute(async () => {
      // Validate required fields
      this.validateRequired(
        {
          name: data.name,
          tiktok_username: data.tiktok_username,
          tiktok_profile_url: data.tiktok_profile_url,
        },
        ["name", "tiktok_username", "tiktok_profile_url"],
      );

      // Check username uniqueness
      const taken = await creatorRepository.isUsernameTaken(
        data.tiktok_username,
      );
      if (taken) {
        throw new ConflictError("TikTok username is already registered");
      }

      return creatorRepository.createCreator({
        name: data.name,
        tiktok_username: data.tiktok_username,
        tiktok_profile_url: data.tiktok_profile_url,
        city: data.city,
        country: data.country,
        content_language: data.content_language,
        ...(data.agency_id
          ? { agency: { connect: { id: data.agency_id } } }
          : {}),
      });
    }, "Failed to create creator");
  }
}

// Export singleton instance
export const creatorService = new CreatorService();
