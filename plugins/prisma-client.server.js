
import prisma from '../prisma.js'

export default defineNuxtPlugin(() => {  
    return {
      provide: {
        prisma: () => prisma
      }
    }
})