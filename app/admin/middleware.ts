import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const ADMIN_HOST = process.env.ADMIN_HOST ?? "admin.opentreatment.in";

export async function middleware(req: NextRequest) {
  // Force this app to only work on the admin subdomain
  if (req.headers.get("host") !== ADMIN_HOST) {
    return NextResponse.redirect("https://opentreatment.in/");
  }

  const url = req.nextUrl;
  const isAuthRoute =
    url.pathname.startsWith("/api/auth") || url.pathname.startsWith("/auth");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Block any registration page in admin app (if accidentally added)
  if (url.pathname.startsWith("/auth/register")) {
    return NextResponse.redirect(new URL("/auth/admin", req.url));
  }

  // Require login for all non-auth routes
  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/admin", req.url));
  }

  // Kick out non-admins
  if (token && (token as any).role !== "ADMIN") {
    return NextResponse.redirect("https://opentreatment.in/");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
