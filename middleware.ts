import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Role } from "@prisma/client";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Agar login page pe hai aur already logged in
  if (pathname.startsWith("/auth") && token) {
    if (token.role === Role.DOCTOR) {
      return NextResponse.redirect(new URL("/doctor", req.url));
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Doctor-only routes
  if (pathname.startsWith("/doctor")) {
    if (!token || token.role !== Role.DOCTOR) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  // Admin-only routes
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== Role.ADMIN) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/doctor/:path*", "/admin/:path*", "/auth/:path*"],
};
