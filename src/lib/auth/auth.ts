import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";
import prisma from "@/lib/db/prisma";

/**
 * Auth.js Instance
 * Configured with Prisma adapter for database sessions
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  ...authConfig,
});
