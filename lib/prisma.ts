import { PrismaClient } from "@prisma/client";

// ✅ make globalThis type-safe
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// ✅ use globalThis instead of global - works in both dev and serverless environments
const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

// ✅ Cache prisma instance to avoid multiple instances in serverless environments
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
} else {
  // In production (Vercel serverless), also cache to prevent multiple instances
  if (!globalThis.prisma) {
    globalThis.prisma = prisma;
  }
}

export default prisma;
