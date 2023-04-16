import prisma from '../prisma.server.ts'
import { Packr } from 'msgpackr/pack'

export default defineEventHandler(async (event) => {
    console.log('API call recieved for GET guild-data...')
    let start = Date.now()
    const guildDataPromise =  prisma.human_guild_list.findMany()

    const guildData = await guildDataPromise

    let end = Date.now()

    console.log(end - start)

    start = Date.now()
    // const packedData = pack(data)
    const packr = new Packr({ mapsAsObjects: true, variableMapSize: true });
    const packedData = packr.encode(guildData)
    end = Date.now()

    console.log(end - start)
    event.node.res.setHeader('content-type', 'application/octet-stream')
    event.node.res.end(packedData)
    
})