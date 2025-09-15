import { withAuth } from "next-auth/middleware";
import { Role } from "@prisma/client";

export default withAuth({
  async authorize({ token, req }) {
    if (!token) return false;

    const path = req.nextUrl.pathname;

    // Doctor route
    if (path.startsWith("/doctor")) {
      return token.role === Role.DOCTOR;
    }

    // User route (root /)
    if (path === "/") {
      return token.role === Role.USER;
    }

    return false; // Default block
  },
});

export const config = {
  matcher: ["/", "/doctor/:path*"], // Only protect / and /doctor/*
};
