import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // logged-in user id
      role?: string | null; // add role property
    } & DefaultSession["user"];
  }

  // Also extend the User type if you want
  interface User {
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string | null;
  }
}