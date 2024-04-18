import { PrismaClient } from '@prisma/client';

export const dbConnect = async () => {
  const prisma = new PrismaClient();
  return prisma;
};
