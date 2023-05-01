import { PrismaClient } from '@prisma/client'

let prisma = null

if (!global.prisma) 
{
    console.log('Creating new prisma client...')
    global.prisma = new PrismaClient()
    console.log('Created prisma client')
}

prisma = global.prisma

export default prisma