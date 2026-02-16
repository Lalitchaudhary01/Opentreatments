import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

type UserRole =
  | "USER"
  | "ADMIN"
  | "DOCTOR"
  | "HOSPITAL"
  | "PHARMACY"
  | "INSURANCE_COMPANY";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: UserRole;
    phone?: string | null;
    image?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: UserRole;
      phone?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    phone?: string | null;
    image?: string | null;
  }
}
