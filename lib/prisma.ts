import { PrismaClient } from "@prisma/client";

// ✅ make globalThis type-safe
declare global {
  var prisma: PrismaClient | undefined;
}

// ✅ use globalThis instead of global
const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

// ✅ Cache prisma instance in both dev and production to avoid multiple instances
if (!globalThis.prisma) {
  globalThis.prisma = prisma;
}

export default prisma;
