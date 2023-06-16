import prisma from '../../prisma.server.ts'
import { Packr } from 'msgpackr/pack'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    console.log('API call recieved for POST guild/members...')

    // Get the body
    const body = await readBody(event)
    const guildId = body['guildId']
    
    let start = Date.now()
    
    const membersPromise =  prisma.guild_members.findMany({
        select: {
          class_id: true,
          member: true,
          level: true,
          estimated_cp: true,
          current_cp: true
        },
        where: {
            guild_id: guildId
        },
        orderBy: [
          { estimated_cp: 'desc' }
        ]
    })
  
    const guildData = await membersPromise

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