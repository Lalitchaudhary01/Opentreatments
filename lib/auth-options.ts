import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { Role } from "@prisma/client";

const baseAdapter = PrismaAdapter(prisma);
type AdapterCreateUserInput = Parameters<NonNullable<Adapter["createUser"]>>[0];
const authAdapter: Adapter = {
  ...baseAdapter,
  async createUser(data: AdapterCreateUserInput) {
    try {
      return await baseAdapter.createUser!(data);
    } catch (error) {
      // Fallback for OAuth email collisions with existing credential users.
      if (data.email) {
        const existing = await prisma.user.findUnique({
          where: { email: data.email },
        });
        if (existing) {
          return existing;
        }
      }
      throw error;
    }
  },
};

export const authOptions: AuthOptions = {
  adapter: authAdapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;
        if (!user.isVerified)
          throw new Error("Please verify your email before logging in");

        const valid = await compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role as Role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  pages: { signIn: "/auth" },

  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phone = user.phone;
        token.role = user.role as Role;
      }

      // Keep token role in sync with DB (needed after Google role switch flow).
      if (token?.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { id: true, name: true, phone: true, role: true },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.phone = dbUser.phone;
          token.role = dbUser.role as Role;
        }
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.phone = token.phone;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
};
