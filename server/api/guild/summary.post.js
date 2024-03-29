import prisma from '../../prisma.server.ts'
import { Packr } from 'msgpackr/pack'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    console.log('API call recieved for POST summary...')

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

    let convertedData = {}

    if (res['success'] && res['score'] > 0.5)
    {
      let start = Date.now()
    
      const summaryPromise =  prisma.guild_summary.findUnique({
          select: {
              Guild_Name: true,
              Guild_Master: true,
              Ship_HP: true,
              Ranking: true,
              Rank: true,
              Timeslot: true,
              Description: true,
              Recruitment_Msg: true,
              Total_Estimated_CP: true
          },
          where: {
              guilddataid: guildId
          }
      })
    
      const guildData = await summaryPromise
  
      convertedData['Guild Name'] = guildData['Guild_Name']
      convertedData['Guild Master'] = guildData['Guild_Master']
      convertedData['Ship HP'] = guildData['Ship_HP']
      convertedData['Ranking'] = guildData['Ranking']
      convertedData['Rank'] = guildData['Rank']
      convertedData['Timeslot'] = guildData['Timeslot']
      convertedData['Description'] = guildData['Description']
      convertedData['Recruitment Msg'] = guildData['Recruitment_Msg']
      convertedData['Total Estimated CP'] = guildData['Total_Estimated_CP']  
  
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