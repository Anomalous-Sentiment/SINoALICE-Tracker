import prisma from '../prisma.server.ts'
import { Packr } from 'msgpackr/pack'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    console.log('API call recieved POST timeslots...')
    // Get the body
    const body = await readBody(event)
    const token = body['token']

    const params = new URLSearchParams({
      secret: useRuntimeConfig().secretCaptchaKey,
      response: token
    })
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify?' + params, {
      method: 'POST'
    }).then(res => res.json())
    console.log(res)

    let timeslotList = []

    // Check score to see if real user making request
    if (res['success'] && res['score'] > 0.5)
    {
      let start = Date.now()

      // Get matchups for the specified GC
      const timeslotPromise =  prisma.timeslots.findMany()
  
      timeslotList = await timeslotPromise
      let end = Date.now()
  
      console.log(end - start)
      
    }

    const packr = new Packr({ mapsAsObjects: true, variableMapSize: true });
    const packedData = packr.encode(timeslotList)
    
    event.node.res.setHeader('content-type', 'application/octet-stream')
    event.node.res.end(packedData)
    
  }
  catch (err) {
    console.log(err)

  }
})