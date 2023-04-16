import { defineStore } from 'pinia'

export const useTimeslotStore = defineStore('timeslots', {
    state: () => ({
        timeslots: []
    }),
    actions: {
      async populateTimeslotStore() {
        if (this.timeslots.length == 0)
        {
          const nuxtApp = useNuxtApp()
          const buffer = await $fetch('/api/timeslots', { headers: {Accept: 'application/octet-stream'}, responseType: 'arrayBuffer'})
          const timeslotData = nuxtApp.$unpack(buffer)
  
          this.timeslots = timeslotData
        }
      }
    },
})