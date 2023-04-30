import prisma from '~/server/prisma.server.ts'
import { PrismaClient } from '@prisma/client'

export default defineNitroPlugin((nitroApp) => {
    //console.log('Nitro plugin', nitroApp)
    console.log('Nitro server initialised')

    //nitroApp.$prisma = new PrismaClient()
    //console.log('Prisma client created')
    
  })