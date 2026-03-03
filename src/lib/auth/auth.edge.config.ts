import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth config — NO Prisma, NO Node.js-only modules.
 * Used ONLY in middleware.ts (Edge runtime).
 * Full auth config with DB access is in auth.config.ts.
 */
export const authEdgeConfig: NextAuthConfig = {
  providers: [], // Providers not needed for middleware JWT validation

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role?: string }).role as string;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },
};
