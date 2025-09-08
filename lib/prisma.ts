import { PrismaClient } from "@prisma/client";

// ✅ make globalThis type-safe
declare global {
  var prisma: PrismaClient | undefined;
}

// ✅ use globalThis instead of global
const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: ["error", "warn"],
  });

// ✅ only assign in dev to avoid multiple instances
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
