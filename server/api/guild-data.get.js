import prisma from '../prisma.server.ts'
import { pack } from 'msgpackr/pack'

export default defineEventHandler(async (event) => {
    // Read body of req
    //const body = await readBody(event)
    //const nuxtApp = useNuxtApp()
    const res =  await prisma.guilds.findMany()
    const packedData = pack(res)
    console.log(packedData)
    event.node.res.end(packedData)
})
