import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const ROLE = {
  USER: "USER",
  DOCTOR: "DOCTOR",
  HOSPITAL: "HOSPITAL",
  PHARMACY: "PHARMACY",
  INSURANCE_COMPANY: "INSURANCE_COMPANY",
  ADMIN: "ADMIN",
} as const;

type AppRole = (typeof ROLE)[keyof typeof ROLE];

const roleHome: Record<AppRole, string> = {
  [ROLE.USER]: "/",
  [ROLE.DOCTOR]: "/doctor/overview",
  [ROLE.HOSPITAL]: "/hospital/dashboard",
  [ROLE.PHARMACY]: "/pharmacy/overview",
  [ROLE.INSURANCE_COMPANY]: "/insurance/dashbaord",
  [ROLE.ADMIN]: "/admin/dashbaord",
};

const doctorAuthModes = new Set(["doctor-details", "doctor-clinic", "doctor-success"]);
const pharmacyAuthModes = new Set(["pharmacy-details", "pharmacy-location", "pharmacy-success"]);
const hospitalAuthModes = new Set(["hospital-details", "hospital-location", "hospital-success"]);

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const role = token?.role as AppRole | undefined;
    const mode = req.nextUrl.searchParams.get("mode");
    const isAuthPath = path.startsWith("/auth");
    const isRoleOnboardingAuthRoute =
      isAuthPath &&
      !!mode &&
      ((role === ROLE.DOCTOR && doctorAuthModes.has(mode)) ||
        (role === ROLE.PHARMACY && pharmacyAuthModes.has(mode)) ||
        (role === ROLE.HOSPITAL && hospitalAuthModes.has(mode)));

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
        role === ROLE.DOCTOR
          ? "/doctor"
          : role === ROLE.PHARMACY
            ? "/pharmacy"
          : role === ROLE.HOSPITAL
              ? "/hospital"
              : role === ROLE.INSURANCE_COMPANY
                ? "/insurance"
                : role === ROLE.ADMIN
                  ? "/admin"
                  : null;

      if (allowedPrefix && !path.startsWith(allowedPrefix) && !isRoleOnboardingAuthRoute) {
        return NextResponse.redirect(new URL(roleHome[role], req.url));
      }
    }

    // Panel prefix protection for unauthenticated or wrong-role access.
    if (path.startsWith("/doctor") && (!token || role !== ROLE.DOCTOR)) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (path.startsWith("/hospital") && (!token || role !== ROLE.HOSPITAL)) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (path.startsWith("/pharmacy") && (!token || role !== ROLE.PHARMACY)) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (path.startsWith("/insurance") && (!token || role !== ROLE.INSURANCE_COMPANY)) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (path.startsWith("/admin") && (!token || role !== ROLE.ADMIN)) {
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
