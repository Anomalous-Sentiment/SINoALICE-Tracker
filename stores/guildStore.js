import { defineStore } from 'pinia'
import prisma from '../server/prisma.server.js'

export const useGuildStore = defineStore('guilds', {
    state: () => ({
        guilds: [],
        timeslots: []
    }),
    getters: {
      alsoGuilds: (state) => state.guilds,
    },
    actions: {
      async populateGuilds() {
        // Get the data from database and set state
        // Use the view to get guild data
        const guildData =  await prisma.human_guild_list.findMany()
        this.guilds = guildData

        const timeslotData =  await prisma.timeslots.findMany()
        console.log(timeslotData)
        this.timeslots = timeslotData
      }
    },
})