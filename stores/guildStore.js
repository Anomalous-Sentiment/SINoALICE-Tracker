import { defineStore } from 'pinia'

export const useGuildStore = defineStore('guilds', {
    state: () => ({
        guilds: [],
    }),
    actions: {
      setGuilds(guildList) {
        this.guilds = guildList
      },
      async populateGuildStore() {
        if (this.guilds.length == 0)
        {
          const nuxtApp = useNuxtApp()
          const buffer = await $fetch('/api/guild-data', { headers: {Accept: 'application/octet-stream'}, responseType: 'arrayBuffer'})
          const data = nuxtApp.$unpack(buffer)
  
          this.guilds = data
        }
      }
    },
})