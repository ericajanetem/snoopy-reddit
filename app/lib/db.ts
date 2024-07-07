// Initiate the Prisma Client here
// Reaason: In development, the command next dev clears Node.js cache on run. 
// This in turn initializes a new PrismaClient instance each time due to hot reloading that creates a connection to the database. 
// This can quickly exhaust the database connections as each PrismaClient instance holds its own connection pool.

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma