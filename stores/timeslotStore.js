import { defineStore } from 'pinia'

export const useTimeslotStore = defineStore('timeslots', {
    state: () => ({
        timeslots: [],
        gcTimeslots: [],
    }),
    actions: {
      async populateTimeslotStore() {
        if (this.timeslots.length == 0)
        {
          const nuxtApp = useNuxtApp()
          const reqHeaders = useRequestHeaders(['Cookie'])
          const buffer = await $fetch('/api/timeslots', { headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer'})
          const timeslotData = nuxtApp.$unpack(buffer)
  
          this.timeslots = timeslotData
          this.gcTimeslots = timeslotData.filter(value => value['gc_available'])
        }
      }
    },
})