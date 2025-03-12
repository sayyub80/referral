import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow access to login, register, user/login, admin/login pages
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/user/login") ||
    pathname.startsWith("/user/register") ||
    pathname.startsWith("/admin/register") ||
    pathname.startsWith("/admin/login")
  ) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!token) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    } else if (pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/user/login", req.url));
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Handle admin-specific routes
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Handle user-specific routes
  if (pathname.startsWith("/user") && token.role !== "user") {
    return NextResponse.redirect(new URL("/user/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"], // Protect all routes under /user and /admin
};