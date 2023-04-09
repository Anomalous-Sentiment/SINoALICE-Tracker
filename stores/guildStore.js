import { defineStore } from 'pinia'
import prisma from '../server/prisma.server.js'

export const useGuildStore = defineStore('guilds', {
    state: () => ({
        guilds: []
    }),
    getters: {
      alsoGuilds: (state) => state.guilds,
    },
    actions: {
      async populateGuilds() {
        console.log('test')
        // Get the data from database and set state
        // Use the view
        const res =  await prisma.human_guild_list.findMany()
        this.guilds = res
      }
    },
})