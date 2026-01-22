import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../../prisma/generated/client";

declare global {
  var prisma: PrismaClient; // This must be a `var` and not a `let / const`
}

const prisma =
  global.prisma ||
  new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }),
  });

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}

export default prisma;
