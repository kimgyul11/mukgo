import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton(); //싱글톤 패턴 하나의 객체만 보장한다.

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
