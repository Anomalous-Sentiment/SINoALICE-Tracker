import { PrismaClient } from '@prisma/client'

let prisma = null

if (process.server)
{
    prisma = new PrismaClient()

}

export default prisma