import type { Creator, Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { BaseRepository } from "@/lib/db/repositories/base.repository";

/**
 * Creator Repository
 * Handles all database operations for Creator entity
 */
export class CreatorRepository extends BaseRepository<Creator> {
  constructor() {
    super(prisma, "creator");
  }

  /**
   * Get creators with pagination and optional search
   */
  async getPaginated(options: {
    page: number;
    pageSize: number;
    search?: string;
  }): Promise<{
    creators: (Creator & { agency: { name: string } | null })[];
    total: number;
  }> {
    const { page, pageSize, search } = options;
    const skip = (page - 1) * pageSize;

    const where: Prisma.CreatorWhereInput = {
      deleted_at: null,
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { tiktok_username: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [creators, total] = await Promise.all([
      prisma.creator.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { created_at: "desc" },
        include: {
          agency: { select: { name: true } },
        },
      }),
      prisma.creator.count({ where }),
    ]);

    return { creators, total };
  }

  /**
   * Find creator by ID with related data
   */
  async findByIdWithRelations(id: string): Promise<
    | (Creator & {
        agency: { name: string } | null;
        creator_contact: {
          email_encrypted: string | null;
          whatsapp_encrypted: string | null;
        } | null;
      })
    | null
  > {
    return prisma.creator.findUnique({
      where: { id, deleted_at: null },
      include: {
        agency: { select: { name: true } },
        creator_contact: {
          select: {
            email_encrypted: true,
            whatsapp_encrypted: true,
            is_verified: true,
          },
        },
      },
    }) as Promise<
      | (Creator & {
          agency: { name: string } | null;
          creator_contact: {
            email_encrypted: string | null;
            whatsapp_encrypted: string | null;
            is_verified: boolean;
          } | null;
        })
      | null
    >;
  }

  /**
   * Check if tiktok_username is already taken
   */
  async isUsernameTaken(
    username: string,
    excludeId?: string,
  ): Promise<boolean> {
    const where: Prisma.CreatorWhereInput = {
      tiktok_username: username,
      deleted_at: null,
    };
    if (excludeId) {
      (where as Prisma.CreatorWhereInput & { id?: unknown }).id = {
        not: excludeId,
      };
    }
    return this.exists(where as Record<string, unknown>);
  }

  /**
   * Create a creator
   */
  async createCreator(data: Prisma.CreatorCreateInput): Promise<Creator> {
    return prisma.creator.create({ data });
  }
}

// Export singleton instance
export const creatorRepository = new CreatorRepository();
