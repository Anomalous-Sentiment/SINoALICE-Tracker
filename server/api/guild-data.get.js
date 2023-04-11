import prisma from '../prisma.server.ts'
import { pack } from 'msgpackr/pack'
import { useGuildStore } from '@/stores/guildStore.js'

export default defineEventHandler(async (event) => {
    console.log('API call recieved...')
    let start = Date.now()
    const guildDataPromise =  prisma.human_guild_list.findMany()
    const timeslotDataPromise = prisma.timeslots.findMany()

    const [guildData, timeslotData] = await Promise.all([guildDataPromise, timeslotDataPromise])

    let end = Date.now()

    console.log(end - start)

    // Read body of req
    //const body = await readBody(event)
    //const nuxtApp = useNuxtApp()
    
    //const res =  await prisma.guilds.findMany()
    const data = {
        guilds: guildData,
        timeslots: timeslotData
    }
    start = Date.now()
    const packedData = pack(data)
    end = Date.now()

    console.log(end - start)
    event.node.res.end(packedData)
    
})