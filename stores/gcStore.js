import { defineStore } from 'pinia'
import { useReCaptcha } from 'vue-recaptcha-v3';

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
      async populateGcList() {
        if (this.gcList.length == 0)
        {
          const recaptchaInstance = useReCaptcha();
          await recaptchaInstance?.recaptchaLoaded();

          // get the token, a custom action could be added as argument to the method
          const token = await recaptchaInstance?.executeRecaptcha('gc_event_list');
          const nuxtApp = useNuxtApp()
          const reqHeaders = useRequestHeaders(['Cookie'])

          const buffer = await $fetch('/api/gc-list', { method: 'POST', headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer', body: {token: token}})
          const data = nuxtApp.$unpack(buffer)
          this.gcList = data
        }
      },
      async populateMatchupList(gcNumber, matchupsToken) {
        // Run only if data for the gc is not in store
        if (!this.gcMatchups.hasOwnProperty(gcNumber))
        {
            const nuxtApp = useNuxtApp()
            const reqHeaders = useRequestHeaders(['Cookie'])
            console.log(matchupsToken)


            const buffer = await $fetch('/api/gc-matchups', { method: 'POST', headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer', body: {gc_num: gcNumber, token: matchupsToken}})
            const data = nuxtApp.$unpack(buffer)
            const tmp = []

            let counter = 1
            // Convert the array into an array of json objects
            const processedData = data.map((value, index, dataArr) => {
              // Note we make use of the fact that the list is ordered by LF in descending order
              // Calculate the ranking

              if (index == 0)
              {
                value['ranking'] = 1
                counter++
              }
              else if (tmp[index - 1]['total_lf'] == value['total_lf'])
              {
                // If the previous guild in ranking has the same LF, this guild's rank will be the same as the previous
                value['ranking'] = tmp[index - 1]['ranking']
              }
              else
              {
                value['ranking'] = counter
                counter++
              }

              const lfArray = value.daily_lf
              let newArr = []
              lfArray.forEach((element, index, array) => {
                let convertedObj = {}
                // Set the day (Using knowledge that the array is already ordered by day, we can use the index + 1 as the day)
                convertedObj.day = index + 1

                // Set the LF value on the day
                convertedObj.lf = element

                // Calculate the gain if not first element (day 1)
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

                // Get the opponent LF gain (Uses fact that the opp_lf sub array is already sorted by GC day)
                convertedObj['opp_lf'] = value['opp_lf'][index]

                newArr.push(convertedObj)

              });

              value.daily_lf = newArr;
              tmp.push(value)
              return value;


            })
            this.gcMatchups[gcNumber] = processedData
        }
      }
    },
})