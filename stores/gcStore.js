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
          const reqHeaders = useRequestHeaders(['Cookie'])

          const buffer = await $fetch('/api/gc-list', { headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer'})
          const data = nuxtApp.$unpack(buffer)
          this.gcList = data
        }
      },
      async populateMatchupList(gcNumber) {
        // Run only if data for the gc is not in store
        if (!this.gcMatchups.hasOwnProperty(gcNumber))
        {
            const nuxtApp = useNuxtApp()
            const reqHeaders = useRequestHeaders(['Cookie'])


            const buffer = await $fetch('/api/gc-matchups', { method: 'POST', headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer', body: {gc_num: gcNumber}})
            const data = nuxtApp.$unpack(buffer)

            // Convert the array into an array of json objects
            const processedData = data.map((value, index) => {
              const lfArray = value.daily_lf
              let newArr = []
              lfArray.forEach((element, index, array) => {
                let convertedObj = {}
                // Set the day (Using knowledge that the array is already ordered by day, we can use the index + 1 as the day)
                convertedObj.day = index + 1

                // Set the LF value on the day
                convertedObj.lf = element

                // Calculate the gain if not fiurst element (day 1)
                if (index > 0)
                {
                  convertedObj.lf_gain = element - array[index - 1]
                }
                else
                {
                  convertedObj.lf_gain = element

                }
                // Get the oponent name for the day as well
                convertedObj.opponent = value[`day_${index + 1}`]

                newArr.push(convertedObj)

              });

              value.daily_lf = newArr;
              return value;


            })
            this.gcMatchups[gcNumber] = processedData
        }
      }
    },
})