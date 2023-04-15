import { defineStore } from 'pinia'

export const useGuildStore = defineStore('guilds', {
    state: () => ({
        guilds: [],
        timeslots: []
    }),
    getters: {
      alsoGuilds: (state) => state.guilds,
    },
    actions: {
      setGuilds(guildList) {
        this.guilds = guildList
      },
      setTimeslots(timeslotList) {
        this.timeslots = timeslotList
      },
      async populateStore() {
        if (this.guilds.length == 0 || this.timeslots.length == 0)
        {
          const nuxtApp = useNuxtApp()
          const buffer = await $fetch('/api/guild-data', { headers: {Accept: 'application/octet-stream'}, responseType: 'arrayBuffer'})
          console.log('Fetched Data')
          const data = nuxtApp.$unpack(buffer)
          console.log('Unpacked Data')
  
          this.guilds = data.guilds
          this.timeslots = data.timeslots
          console.log('Set store data')
        }
      }
    },
})