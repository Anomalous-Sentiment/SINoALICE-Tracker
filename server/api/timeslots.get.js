import prisma from '../prisma.server.ts'
import { Packr } from 'msgpackr/pack'

export default defineEventHandler(async (event) => {
    console.log('API call recieved...')
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
    
})