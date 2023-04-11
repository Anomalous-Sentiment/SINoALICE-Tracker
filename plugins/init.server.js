import { defineNuxtPlugin } from '#app'
import { useGuildStore } from '@/stores/guildStore.js'
import prisma from '~/server/prisma.server.ts'

export default defineNuxtPlugin(async (nuxtApp) => {
    nuxtApp.hook('app:rendered', async() => {
        /*
        const guildStore = useGuildStore(nuxtApp.$pinia)

        console.log('Hook Starting...')
        const start = Date.now()
        const guildDataPromise =  prisma.human_guild_list.findMany()
        const timeslotDataPromise = prisma.timeslots.findMany()
    
        const [guildData, timeslotData] = await Promise.all([guildDataPromise, timeslotDataPromise])
    
        const end = Date.now()
    
        console.log(end - start)
        guildStore.setGuilds(guildData)
        guildStore.setTimeslots(timeslotData)
        */
    })

})