import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

type UserRole = "USER" | "ADMIN"; // 👈 Prisma enum ko string union me define kar lo

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: UserRole;
    image?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: UserRole;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    image?: string | null;
  }
}
