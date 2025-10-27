import { withAuth } from "next-auth/middleware";
import { Role } from "@prisma/client";

export default withAuth(
  function middleware(req) {
    // This function runs after the token is verified
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Doctor route protection
    if (path.startsWith("/doctor")) {
      if (!token || token.role !== Role.DOCTOR) {
        return Response.redirect(new URL("/auth", req.url));
      }
    }

    // Hospital route protection
    if (path.startsWith("/hospitals")) {
      if (!token || token.role !== Role.HOSPITAL) {
        return Response.redirect(new URL("/auth", req.url));
      }
    }

    // Pharmacy route protection
    if (path.startsWith("/pharmacy")) {
      if (!token || token.role !== Role.PHARMACY) {
        return Response.redirect(new URL("/auth", req.url));
      }
    }

    // Insurance route protection
    if (path.startsWith("/insurance")) {
      if (!token || token.role !== Role.INSURANCE_COMPANY) {
        return Response.redirect(new URL("/auth", req.url));
      }
    }

    // Admin route protection
    if (path.startsWith("/admin")) {
      if (!token || token.role !== Role.ADMIN) {
        return Response.redirect(new URL("/auth", req.url));
      }
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
    "/doctor/:path*",
    "/hospitals/:path*",
    "/pharmacy/:path*",
    "/insurance/:path*",
    "/admin/:path*",
  ],
};
