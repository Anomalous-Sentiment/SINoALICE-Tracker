import { defineNuxtPlugin } from '#app'
import { useGuildStore } from '@/stores/guildStore.js'
import prisma from '~/server/prisma.server.ts'

export default defineNuxtPlugin(async (nuxtApp) => {
    const guildStore = useGuildStore(nuxtApp.$pinia)

    const guildData =  await prisma.human_guild_list.findMany()
    const timeslotData =  await prisma.timeslots.findMany()

    guildStore.setGuilds(guildData)
    guildStore.setTimeslots(timeslotData)
})