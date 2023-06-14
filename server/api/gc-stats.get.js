import prisma from '../prisma.server.ts'
import { Packr } from 'msgpackr/pack'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    console.log('API call recieved for GET gc-stats...')
    const session = await getServerSession(event)
    if (!session) {
      return { status: 'unauthenticated' }
    }
    let start = Date.now()
    
    const top1Promise =  prisma.gc_data.findMany({
      select: {
        gvgeventid: true,
        ranking: true,
        point: true,
      },
      where: {
        ranking: { in: [1, 100, 200, 300, 500]},
        gcday: 6

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
  
    const gcRankingData = await top1Promise

    // Transform gc data into a graphable format
    // t1, t100, t200, t300, and t500 are their own series
    // Y axis is LF
    // X axis is the GC number
    let convertedData = {}

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

    start = Date.now()
    const packr = new Packr({ mapsAsObjects: true, variableMapSize: true });
    const packedData = packr.encode(convertedData)
    end = Date.now()

    console.log(end - start)
    event.node.res.setHeader('content-type', 'application/octet-stream')
    event.node.res.end(packedData)
  }
  catch (err) {
    console.log(err)
  } 
})