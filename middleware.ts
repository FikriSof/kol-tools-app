import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";

/**
 * Middleware uses NextAuth with authConfig only (no PrismaAdapter).
 * Edge runtime does not support Prisma/Node.js modules.
 * JWT strategy reads from cookie without hitting the database.
 */
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Protect all /dashboard routes — redirect to login if not authenticated
  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return Response.redirect(loginUrl);
  }

  // Redirect already-logged-in users away from auth pages
  if (
    (pathname.startsWith("/login") || pathname.startsWith("/register")) &&
    isLoggedIn
  ) {
    return Response.redirect(new URL("/dashboard", req.url));
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
