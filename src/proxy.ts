import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/creators",
  "/unlock-history",
  "/settings",
];
const authRoutes = ["/login", "/register"];

/**
 * Next.js 16 proxy.ts — replaces middleware.ts
 * Runs on Node.js runtime (not Edge).
 */
export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Detect HTTPS (Vercel production) via forwarded header for correct cookie name
  const secureCookie =
    req.headers.get("x-forwarded-proto") === "https" ||
    process.env.NODE_ENV === "production";

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie,
  });

  const isLoggedIn = !!token;
  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAuthPage = authRoutes.some((r) => pathname.startsWith(r));

  // Protect app routes — redirect to login if not authenticated
  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect already-logged-in users away from auth pages
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/* (auth handled per-route)
     * - _next/static, _next/image (static assets)
     * - favicon.ico and public image files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
