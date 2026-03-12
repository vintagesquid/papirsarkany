import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../../prisma/generated/client";

declare global {
  var prisma: PrismaClient; // This must be a `var` and not a `let / const`
}

const prisma =
  globalThis.prisma ||
  new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }),
    transactionOptions: {
      maxWait: 5000,
    },
  });

if (process.env.NODE_ENV === "development") {
  globalThis.prisma = prisma;
}

export default prisma;
