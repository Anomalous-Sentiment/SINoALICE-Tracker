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
        const nuxtApp = useNuxtApp()
        const buffer = await $fetch('/api/guild-data', {responseType: 'arrayBuffer'})
        const data = nuxtApp.$unpack(buffer)

        this.guilds = data.guilds
        this.timeslots = data.timeslots

      }
    },
})