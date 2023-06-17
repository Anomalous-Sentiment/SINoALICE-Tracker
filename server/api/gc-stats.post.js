import prisma from '../prisma.server.ts'
import { Packr } from 'msgpackr/pack'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    console.log('API call recieved for POST gc-stats...')
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

    let convertedData = {}

    // Check score to see if real user making request
    if (res['success'] && res['score'] > 0.5)
    {
      let start = Date.now()
    
      const top1Promise =  prisma.gc_stats.findMany({
        select: {
          gvgeventid: true,
          ranking: true,
          point: true,
        },
        where: {
          ranking: { in: [1, 20, 60, 100, 200, 300, 400, 500]}
        },
        orderBy: [
          {
            gvgeventid: 'asc'
          },
          {
            ranking: 'asc'
          }
        ]
      })
    
      let gcRankingData = await top1Promise
      // Transform gc data into a graphable format
      // t1, t100, t200, t300, and t500 are their own series
      // Y axis is LF
      // X axis is the GC number
      convertedData = {}
  
      // Iterate through array and add data to transition object (Object with rank as key, and array of LF per GC as value)
      gcRankingData.forEach(element => {
        const gc_num = element['gvgeventid']
        const lf = element['point']
        const ranking = element['ranking']
  
        if (ranking in convertedData)
        {
          convertedData[ranking].push([gc_num, lf])
        }
        else
        {
          // Create the key and and element as first value of array
          convertedData[ranking] = []
          convertedData[ranking].push([gc_num, lf])
        }
      });
  
      let end = Date.now()
  
      console.log(end - start)
    }

    const packr = new Packr({ mapsAsObjects: true, variableMapSize: true });
    const packedData = packr.encode(convertedData)

    event.node.res.setHeader('content-type', 'application/octet-stream')
    event.node.res.end(packedData)
  }
  catch (err) {
    console.log(err)
  } 
})