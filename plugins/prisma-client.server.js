
import prisma from '../server/prisma.server.js'

export default defineNuxtPlugin(() => {  
    return {
      provide: {
        prisma: () => prisma
      }
    }
})