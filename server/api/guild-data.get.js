import prisma from '../prisma.server.ts'
import { pack } from 'msgpackr/pack'
import { useGuildStore } from '@/stores/guildStore.js'

export default defineEventHandler(async (event) => {
    console.log('API call recieved...')
    const start = Date.now()
    const guildDataPromise =  prisma.human_guild_list.findMany()
    const timeslotDataPromise = prisma.timeslots.findMany()

    const [guildData, timeslotData] = await Promise.all([guildDataPromise, timeslotDataPromise])

    const end = Date.now()

    console.log(end - start)

    // Read body of req
    //const body = await readBody(event)
    //const nuxtApp = useNuxtApp()
    
    //const res =  await prisma.guilds.findMany()
    const data = {
        guilds: guildData,
        timeslots: timeslotData
    }

    const packedData = pack(data)
    console.log(packedData)
    event.node.res.end(packedData)
    
})
