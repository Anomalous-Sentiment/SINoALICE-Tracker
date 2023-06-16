import { defineStore } from 'pinia'

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
          const reqBody = {
            guildId: guildId
          }
          const nuxtApp = useNuxtApp()

          const reqHeaders = useRequestHeaders(['Cookie'])

          const summaryPromise = $fetch('/api/guild/summary', { method: 'POST', headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer', body: reqBody})
          const membersPromise = $fetch('/api/guild/members', { method: 'POST', headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer', body: reqBody})
          const historyProomise =  $fetch('/api/guild/history', { method: 'POST', headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer', body: reqBody})


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