import prisma from '../prisma.server.ts'
import { Packr } from 'msgpackr/pack'

export default defineEventHandler(async (event) => {
    console.log('API call recieved for GET gc-list...')
    let start = Date.now()

    // Get matchups for the specified GC
    const gcPromise =  prisma.gc_events.findMany()

    const gcListData = await gcPromise
    let end = Date.now()

    console.log(end - start)
    

    start = Date.now()

    const packr = new Packr({ mapsAsObjects: true, variableMapSize: true });
    const packedData = packr.encode(gcListData)
    end = Date.now()

    console.log(end - start)
    
    event.node.res.setHeader('content-type', 'application/octet-stream')
    event.node.res.end(packedData)
    
})