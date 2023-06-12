import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activityData', {
    state: () => ({
        playerActivity: {
          day1Series: [],
          day3Series: [],
          day5Series: [],
          day7Series: [],
          day14Series: []
        },
    }),
    actions: {
      async populateActivityStore() {
        if (this.playerActivity.day1Series.length == 0)
        {
          const nuxtApp = useNuxtApp()
          const reqHeaders = useRequestHeaders(['Cookie'])
          const buffer = await $fetch('/api/player-activity', { headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer'})
          const playerActivityData = nuxtApp.$unpack(buffer)
  
          this.playerActivity = playerActivityData
        }
      }
    },
})