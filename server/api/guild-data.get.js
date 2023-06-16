import prisma from '../prisma.server.ts'
import { Packr } from 'msgpackr/pack'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    console.log('API call recieved for GET guild-data...')
    const session = await getServerSession(event)
    if (!session) {
      return { status: 'unauthenticated' }
    }
    let start = Date.now()
    const guildDataPromise =  prisma.new_human_guild_list.findMany()

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
  }
  catch (err) {
    console.log(err)
  } 
})