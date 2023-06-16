import { defineStore } from 'pinia'
import { useReCaptcha } from 'vue-recaptcha-v3';

export const useguildSummaryStore = defineStore('guild-summary', {
    state: () => ({
        guildSummary: {
          0: {
            summary: {},
            members: [],
            gcHistory: []
          }
        }
    }),
    actions: {
      async populateSummaryStore(guildId) {
        if (!(guildId in this.guildSummary))
        {
          const recaptchaInstance = useReCaptcha();
          await recaptchaInstance?.recaptchaLoaded();

          // get the token, a custom action could be added as argument to the method
          const token1Promise = recaptchaInstance?.executeRecaptcha(`guild_page_id_${guildId}_summary`);
          const token2Promise = recaptchaInstance?.executeRecaptcha(`guild_page_id_${guildId}_members`);
          const token3Promise = recaptchaInstance?.executeRecaptcha(`guild_page_id_${guildId}_history`);

          const [token1, token2, token3] = await Promise.all([token1Promise, token2Promise, token3Promise])
          
          const reqBody1 = {
            guildId: guildId,
            token: token1
          }
          const reqBody2 = {
            guildId: guildId,
            token: token2
          }
          const reqBody3 = {
            guildId: guildId,
            token: token3
          }
          const nuxtApp = useNuxtApp()

          const reqHeaders = useRequestHeaders(['Cookie'])

          const summaryPromise = $fetch('/api/guild/summary', { method: 'POST', headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer', body: reqBody1})
          const membersPromise = $fetch('/api/guild/members', { method: 'POST', headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer', body: reqBody2})
          const historyProomise =  $fetch('/api/guild/history', { method: 'POST', headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer', body: reqBody3})


          const [summaryBuffer, membersBuffer, historyBuffer] = await Promise.all([summaryPromise, membersPromise, historyProomise])

          const summaryData = nuxtApp.$unpack(summaryBuffer)
          const memberData = nuxtApp.$unpack(membersBuffer)
          const gcData = nuxtApp.$unpack(historyBuffer)

          const newGuildData = {
            summary: summaryData,
            members: memberData,
            gcHistory: gcData
          }

          this.guildSummary[guildId] = newGuildData

        }
      }
    },
})