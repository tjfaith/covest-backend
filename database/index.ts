import { PrismaClient, Prisma } from '@prisma/client'
export const prismaClient = new PrismaClient()

module.exports= {prismaClient, Prisma};

export { Prisma };
