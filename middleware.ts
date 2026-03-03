import NextAuth from "next-auth";
import { authEdgeConfig } from "@/lib/auth/auth.edge.config";

/**
 * Middleware uses authEdgeConfig — NO Prisma, NO Node.js modules.
 * Edge runtime cannot run Prisma/userRepository.
 * JWT is read from cookie without touching the database.
 */
const { auth } = NextAuth(authEdgeConfig);

const protectedRoutes = [
  "/dashboard",
  "/creators",
  "/unlock-history",
  "/settings",
];
const authRoutes = ["/login", "/register"];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAuthPage = authRoutes.some((r) => pathname.startsWith(r));

  // Protect app routes — redirect to login if not authenticated
  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return Response.redirect(loginUrl);
  }

  // Redirect already-logged-in users away from auth pages
  if (isAuthPage && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.url));
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
