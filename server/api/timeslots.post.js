import prisma from '../prisma.server.ts'
import { Packr } from 'msgpackr/pack'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    console.log('API call recieved POST timeslots...')

    let start = Date.now()

    // Get matchups for the specified GC
    const timeslotPromise =  prisma.timeslots.findMany()

    const timeslotList = await timeslotPromise
    let end = Date.now()

    console.log(end - start)
    

    start = Date.now()

    const packr = new Packr({ mapsAsObjects: true, variableMapSize: true });
    const packedData = packr.encode(timeslotList)
    end = Date.now()

    console.log(end - start)
    
    event.node.res.setHeader('content-type', 'application/octet-stream')
    event.node.res.end(packedData)
    
  }
  catch (err) {
    console.log(err)

  }
})