import { defineStore } from 'pinia'

export const useGcStore = defineStore('gcData', {
    state: () => ({
        gcMatchups: {},
        gcList: []
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
      async populateGcList() {
        if (this.gcList.length == 0)
        {
          const nuxtApp = useNuxtApp()
          const buffer = await $fetch('/api/gc-list', { headers: {Accept: 'application/octet-stream'}, responseType: 'arrayBuffer'})
          const data = nuxtApp.$unpack(buffer)
          this.gcList = data
        }
      },
      async populateMatchupList(gcNumber) {
        // Run only if data for the gc is not in store
        if (!this.gcMatchups.hasOwnProperty(gcNumber))
        {
            const nuxtApp = useNuxtApp()
            const buffer = await $fetch('/api/gc-matchups', { method: 'POST', headers: {Accept: 'application/octet-stream'}, responseType: 'arrayBuffer', body: {gc_num: gcNumber}})
            const data = nuxtApp.$unpack(buffer)
            this.gcMatchups[gcNumber] = data
        }
      }
    },
})