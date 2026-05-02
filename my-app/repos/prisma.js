import "dotenv/config";
import { PrismaClient } from "../prisma/client/index.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis;

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL,
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
