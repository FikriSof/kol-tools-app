import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { userRepository } from "@/lib/db/repositories/user.repository";

/**
 * Auth.js Configuration
 * Defines authentication providers and callbacks
 */
export const authConfig: NextAuthConfig = {
  providers: [
    // Google OAuth Provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

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
      // Initial sign in
      if (user) {
        token.id = user.id as string;
        token.role = (user as any).role;
      }

      // Update session
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

    /**
     * Authorized callback - protects routes
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAuth =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      }

      if (isOnAuth) {
        if (isLoggedIn)
          return Response.redirect(new URL("/dashboard", nextUrl));
        return true;
      }

      return true;
    },
  },

  pages: {
    signIn: "/login",
    error: "/error",
  },

  session: {
    strategy: "jwt",
  },
};
