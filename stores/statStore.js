import { defineStore } from 'pinia'

export const useStatStore = defineStore('statistics', {
    state: () => ({
        playerActivity: {
          day1Series: [],
          day3Series: [],
          day5Series: [],
          day7Series: [],
          day14Series: []
        },
        gcHistory: {}
    }),
    actions: {
      async populateStatStore() {
        if (this.playerActivity.day1Series.length == 0)
        {
          const nuxtApp = useNuxtApp()
          const reqHeaders = useRequestHeaders(['Cookie'])
          const activityBuffer = await $fetch('/api/player-activity', { headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer'})
          const gcHistoryBuffer = await $fetch('/api/gc-stats', { headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer'})

          const playerActivityData = nuxtApp.$unpack(activityBuffer)
          const gcHistory = nuxtApp.$unpack(gcHistoryBuffer)
  
          this.playerActivity = playerActivityData
          this.gcHistory = gcHistory
        }
      }
    },
})