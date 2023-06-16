import prisma from '../prisma.server.ts'
import { Packr } from 'msgpackr/pack'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    try {
        console.log('API call recieved for POST gc-matchups...')
    
        // Get the body
        const body = await readBody(event)
    
        let start = Date.now()
    
        // Get matchups for the specified GC
        const matchupPromise =  prisma.gc_matchups.findMany({
            where: {
                gc_num: body.gc_num
            }
        })
    
        // Will be empty array if gc_num is null?
        const matchupData = await matchupPromise
        let end = Date.now()
    
        console.log(end - start)
        
    
        start = Date.now()
        // const packedData = pack(data)
        const packr = new Packr({ mapsAsObjects: true, variableMapSize: true });
        const packedData = packr.encode(matchupData)
        end = Date.now()
    
        console.log(end - start)
        
        event.node.res.setHeader('content-type', 'application/octet-stream')
        event.node.res.end(packedData)
    }
    catch (err) {
        console.log(err)

    }
    
})