import prisma from '../../prisma.server.ts'
import { Packr } from 'msgpackr/pack'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    console.log('API call recieved for POST guild/members...')

    // Get the body
    const body = await readBody(event)
    const guildId = body['guildId']
    const token = body['token']

    const params = new URLSearchParams({
      secret: useRuntimeConfig().secretCaptchaKey,
      response: token
    })
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify?' + params, {
      method: 'POST'
    }).then(res => res.json())
    console.log(res)

    let memberData = []
    if (res['success'] && res['score'] > 0.5)
    {
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
    
      memberData = await membersPromise
  
      let end = Date.now()
  
      console.log(end - start)
    }

    const packr = new Packr({ mapsAsObjects: true, variableMapSize: true });
    const packedData = packr.encode(memberData)

    event.node.res.setHeader('content-type', 'application/octet-stream')
    event.node.res.end(packedData)
  }
  catch (err) {
    console.log(err)
  } 
})