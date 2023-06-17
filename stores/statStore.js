import { defineStore } from 'pinia'
import { useReCaptcha } from 'vue-recaptcha-v3';

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
          const recaptchaInstance = useReCaptcha();
          await recaptchaInstance?.recaptchaLoaded();
          const tokenPromise = recaptchaInstance?.executeRecaptcha('player_statistics');
          const token2Promise = recaptchaInstance?.executeRecaptcha('gc_statistics');

          const token1 = await tokenPromise
          const token2 = await token2Promise

          const nuxtApp = useNuxtApp()
          const reqHeaders = useRequestHeaders(['Cookie'])
          const activityPromise = $fetch('/api/player-activity', { method: 'POST', headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer', body: {token: token1}})
          const gcHistoryPromise = $fetch('/api/gc-stats', { method: 'POST', headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer', body: {token: token2}})


          const activityBuffer = await activityPromise
          const gcHistoryBuffer = await gcHistoryPromise
          const playerActivityData = nuxtApp.$unpack(activityBuffer)
          const gcHistory = nuxtApp.$unpack(gcHistoryBuffer)
  
          this.playerActivity = playerActivityData
          this.gcHistory = gcHistory
        }
      }
    },
})