import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { userRepository } from "@/lib/db/repositories/user.repository";

/**
 * Auth.js Configuration
 * Defines authentication providers and callbacks
 */
export const authConfig: NextAuthConfig = {
  trustHost: true,
  providers: [
    // Google OAuth Provider
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),

    // Credentials Provider (email/password)
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user by email
        const user = await userRepository.findByEmail(
          credentials.email as string,
        );

        if (!user || !user.password_hash) {
          return null;
        }

        // In production, use bcrypt to compare passwords
        // const isValid = await bcrypt.compare(
        //   credentials.password as string,
        //   user.password
        // );

        // For now, simple comparison (NOT SECURE - CHANGE IN PRODUCTION)
        const isValid = credentials.password === user.password_hash;

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          // name: user.name,
          // image: user.image,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    /**
     * JWT callback - runs when JWT is created or updated
     */
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role?: string }).role as string;
      }
      if (trigger === "update" && session) {
        token.name = session.name;
        token.email = session.email;
      }
      return token;
    },

    /**
     * Session callback - runs when session is checked
     */
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    // NOTE: Route protection is handled by middleware.ts + layout guards.
    // Do NOT add an authorized() callback here — it causes redirect loops.
  },

  pages: {
    signIn: "/login",
    error: "/error",
  },

  session: {
    strategy: "jwt",
  },
};
