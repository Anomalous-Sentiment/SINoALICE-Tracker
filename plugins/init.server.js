import { defineNuxtPlugin } from '#app'
import { useGuildStore } from '@/stores/guildStore.js'
import prisma from '~/server/prisma.server.ts'

export default defineNuxtPlugin(async (nuxtApp) => {
    /*
    const guildStore = useGuildStore(nuxtApp.$pinia)

    const guildDataPromise =  prisma.human_guild_list.findMany()
    const timeslotDataPromise = prisma.timeslots.findMany()

    const [guildData, timeslotData] = await Promise.all([guildDataPromise, timeslotDataPromise])

    guildStore.setGuilds(guildData)
    guildStore.setTimeslots(timeslotData)
    */
})