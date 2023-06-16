import prisma from '../../prisma.server.ts'
import { Packr } from 'msgpackr/pack'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    console.log('API call recieved for POST guild/history...')

    // Get the body
    const body = await readBody(event)
    const guildId = body['guildId']
    
    let start = Date.now()
    
    const historyPromise =  prisma.guild_gc_history.findMany({
        select: {
          gc_num: true,
          member_num: true,
          timeslot: true,
          lifeforce: true,
          ranking: true,
          ts_ranking: true,
          wins: true
        },
        where: {
            guilddataid: guildId
        },
        orderBy: [
          { gc_num: 'desc' }
        ]
    })
  
    const guildData = await historyPromise

    let end = Date.now()

    console.log(end - start)

    start = Date.now()
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