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
        console.log('populating')
        const buffer = await $fetch('/api/guild-data', {responseType: 'arrayBuffer'})
        console.log('After fetch')
        const data = nuxtApp.$unpack(buffer)
        console.log(data.guilds[0])
        console.log(data.timeslots[0])
        this.guilds = data.guilds
        this.timeslots = data.timeslots
        /*
        console.log('Hi')
        const res = await fetch('/api/guild-data')
        console.log('Hi0')
        console.log('Hi1')
        if (res.ok)
        {
            //Get data from body
            const body = await res.arrayBuffer()
            //Unpack the msgpack
            const data = nuxtApp.$unpack(body)
    
            this.guilds = data.guilds
            this.timeslots = data.timeslots
        }
    */
      }
    },
})