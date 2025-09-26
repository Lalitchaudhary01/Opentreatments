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

    return true; // Baaki sab routes (jaise /) public hai
  },
});

export const config = {
  matcher: ["/doctor/:path*"], // Sirf doctor routes protect hain
};
