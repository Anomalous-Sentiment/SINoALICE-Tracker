import prisma from '../prisma.server.ts'
import { Packr } from 'msgpackr/pack'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    console.log('API call recieved for POST player-activity...')

    let start = Date.now()
    const playerActivityPromise =  prisma.player_activity.findMany({
      orderBy: [
        {
          snapshot_date: 'desc'
        }
      ]
    })

    const activityData = await playerActivityPromise

    //Convert data into an array of arrays
    const convertedData = {
      day1Series: [],
      day3Series: [],
      day5Series: [],
      day7Series: [],
      day14Series: []
    }

    activityData.forEach(element => {
      // Get the data
      const date = element['snapshot_date']
      const login1Day = element['logged_within_1_day']
      const login3Day = element['logged_within_3_days']
      const login5Day = element['logged_within_5_days']
      const login7Day = element['logged_within_7_days']
      const login14Day = element['logged_within_14_days']

      // Add to converted data array
      convertedData['day1Series'].push([date, login1Day])
      convertedData['day3Series'].push([date, login3Day])
      convertedData['day5Series'].push([date, login5Day])
      convertedData['day7Series'].push([date, login7Day])
      convertedData['day14Series'].push([date, login14Day])

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