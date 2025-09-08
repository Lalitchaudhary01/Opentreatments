import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // logged-in user id
    } & DefaultSession["user"];
  }
}
