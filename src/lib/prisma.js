import { PrismaClient } from "@prisma/client"

const prismaDb = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaDb

export default prismaDb
