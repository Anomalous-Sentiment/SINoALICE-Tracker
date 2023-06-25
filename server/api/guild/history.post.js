import prisma from '../../prisma.server.ts'
import { Packr } from 'msgpackr/pack'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    console.log('API call recieved for POST guild/history...')

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

    let guildData = []

    // Check score to see if real user making request
    if (res['success'] && res['score'] > 0.5)
    {
      let start = Date.now()
    
      const historyPromise =  prisma.new_guild_gc_history.findMany({
          select: {
            gc_num: true,
            guildname: true,
            other_names: true,
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
    
      guildData = await historyPromise
  
      let end = Date.now()
  
      console.log(end - start)
    }
    
    const packr = new Packr({ mapsAsObjects: true, variableMapSize: true });
    const packedData = packr.encode(guildData)

    event.node.res.setHeader('content-type', 'application/octet-stream')
    event.node.res.end(packedData)
  }
  catch (err) {
    console.log(err)
  } 
})