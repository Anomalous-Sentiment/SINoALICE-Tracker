import prisma from '../prisma.server.ts'
import { Packr } from 'msgpackr/pack'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    console.log('API call recieved for POST guild-data...')

    console.log(event.node.req.socket.remoteAddress)
    const ipAddr = event.node.req.socket.remoteAddress

    const body = await readBody(event)

    const params = new URLSearchParams({
      secret: useRuntimeConfig().secretCaptchaKey,
      response: body['token']
  })
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify?' + params, {
      method: 'POST'
    }).then(res => res.json())
    console.log(res)

    let guildData = []

    // Check score to see if real user making request
    if (res['success'] && res['score'] > 0.5)
    {
      // Likely a real request. Return data
      let start = Date.now()
      const guildDataPromise =  prisma.new_human_guild_list.findMany()
      
      guildData = await guildDataPromise
  
      let end = Date.now()
  
      console.log(end - start)

    }
    // If score low, don't get data, and just leave guildData empty

    const packr = new Packr({ mapsAsObjects: true, variableMapSize: true });
    const packedData = packr.encode(guildData)

    event.node.res.setHeader('content-type', 'application/octet-stream')
    event.node.res.end(packedData)
  }
  catch (err) {
    console.log(err)
  } 
})