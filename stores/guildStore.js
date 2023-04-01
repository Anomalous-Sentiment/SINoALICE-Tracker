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
        const res =  await prisma.guilds.findMany()
        this.guilds = res
      }
    },
})