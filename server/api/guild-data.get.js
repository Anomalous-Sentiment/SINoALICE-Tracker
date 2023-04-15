import prisma from '../prisma.server.ts'
import { Packr } from 'msgpackr/pack'

export default defineEventHandler(async (event) => {
    console.log('API call recieved...')
    let start = Date.now()
    const guildDataPromise =  prisma.human_guild_list.findMany()
    const timeslotDataPromise = prisma.timeslots.findMany()

    const [guildData, timeslotData] = await Promise.all([guildDataPromise, timeslotDataPromise])

    let end = Date.now()

    console.log(end - start)
    
    const data = {
        guilds: guildData,
        timeslots: timeslotData
    }
    start = Date.now()
    // const packedData = pack(data)
    const packr = new Packr({ mapsAsObjects: true, variableMapSize: true });
    const packedData = packr.encode(data)
    end = Date.now()

    console.log(end - start)
    event.node.res.setHeader('content-type', 'application/octet-stream')
    event.node.res.end(packedData)
    
})