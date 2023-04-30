import { PrismaClient } from '@prisma/client'
console.log('Creating prisma client...')
const prisma = new PrismaClient()
console.log('Created prisma client')

export default prisma