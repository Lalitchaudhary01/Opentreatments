import { withAuth } from "next-auth/middleware";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

const roleHome: Record<Role, string> = {
  [Role.USER]: "/",
  [Role.DOCTOR]: "/doctor/overview",
  [Role.HOSPITAL]: "/hospitals",
  [Role.PHARMACY]: "/pharmacy/overview",
  [Role.INSURANCE_COMPANY]: "/insurance/dashbaord",
  [Role.ADMIN]: "/admin/dashbaord",
};

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const role = token?.role as Role | undefined;

    // If logged in and on auth page, send user to role home.
    if (token && path.startsWith("/auth")) {
      const target = role ? roleHome[role] : "/";
      if (target && target !== path) {
        return NextResponse.redirect(new URL(target, req.url));
      }
    }

    // Strict role-lock: doctor/pharmacy (and others) can only access own panel routes.
    if (token && role) {
      const allowedPrefix =
        role === Role.DOCTOR
          ? "/doctor"
          : role === Role.PHARMACY
            ? "/pharmacy"
            : role === Role.HOSPITAL
              ? "/hospitals"
              : role === Role.INSURANCE_COMPANY
                ? "/insurance"
                : role === Role.ADMIN
                  ? "/admin"
                  : null;

      if (allowedPrefix && !path.startsWith(allowedPrefix)) {
        return NextResponse.redirect(new URL(roleHome[role], req.url));
      }
    }

    // Panel prefix protection for unauthenticated or wrong-role access.
    if (path.startsWith("/doctor") && (!token || role !== Role.DOCTOR)) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (path.startsWith("/hospitals") && (!token || role !== Role.HOSPITAL)) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (path.startsWith("/pharmacy") && (!token || role !== Role.PHARMACY)) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (path.startsWith("/insurance") && (!token || role !== Role.INSURANCE_COMPANY)) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (path.startsWith("/admin") && (!token || role !== Role.ADMIN)) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Public routes that don't need authentication
        if (
          path === "/" ||
          path.startsWith("/user") ||
          path.startsWith("/auth") ||
          path.startsWith("/blog")
        ) {
          return true;
        }

        // Protected routes need a token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/user/:path*",
    "/blog/:path*",
    "/doctor/:path*",
    "/hospitals/:path*",
    "/pharmacy/:path*",
    "/insurance/:path*",
    "/admin/:path*",
  ],
};
