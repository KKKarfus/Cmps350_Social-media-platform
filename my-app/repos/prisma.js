import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis;

const adapter = new PrismaLibSql({
  url: "file:/Users/abdelrahmanabushahba/Downloads/Cmps350/Cmps350_Social-media-platform/prisma/db/dev.db",
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
