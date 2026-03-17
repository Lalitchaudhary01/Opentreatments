import { withAuth } from "next-auth/middleware";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

const roleHome: Record<Role, string> = {
  [Role.USER]: "/",
  [Role.DOCTOR]: "/doctor/overview",
  [Role.HOSPITAL]: "/hospital/dashboard",
  [Role.PHARMACY]: "/pharmacy/overview",
  [Role.INSURANCE_COMPANY]: "/insurance/dashbaord",
  [Role.ADMIN]: "/admin/dashbaord",
};

const doctorAuthModes = new Set(["doctor-details", "doctor-clinic", "doctor-success"]);
const pharmacyAuthModes = new Set(["pharmacy-details", "pharmacy-location", "pharmacy-success"]);
const hospitalAuthModes = new Set(["hospital-details", "hospital-location", "hospital-success"]);

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const role = token?.role as Role | undefined;
    const mode = req.nextUrl.searchParams.get("mode");
    const isAuthPath = path.startsWith("/auth");
    const isRoleOnboardingAuthRoute =
      isAuthPath &&
      !!mode &&
      ((role === Role.DOCTOR && doctorAuthModes.has(mode)) ||
        (role === Role.PHARMACY && pharmacyAuthModes.has(mode)) ||
        (role === Role.HOSPITAL && hospitalAuthModes.has(mode)));

    // If logged in and on auth page, send user to role home (except onboarding flows).
    if (token && isAuthPath && !isRoleOnboardingAuthRoute) {
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
              ? "/hospital"
              : role === Role.INSURANCE_COMPANY
                ? "/insurance"
                : role === Role.ADMIN
                  ? "/admin"
                  : null;

      if (allowedPrefix && !path.startsWith(allowedPrefix) && !isRoleOnboardingAuthRoute) {
        return NextResponse.redirect(new URL(roleHome[role], req.url));
      }
    }

    // Panel prefix protection for unauthenticated or wrong-role access.
    if (path.startsWith("/doctor") && (!token || role !== Role.DOCTOR)) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (path.startsWith("/hospital") && (!token || role !== Role.HOSPITAL)) {
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
    "/hospital/:path*",
    "/pharmacy/:path*",
    "/insurance/:path*",
    "/admin/:path*",
  ],
};
