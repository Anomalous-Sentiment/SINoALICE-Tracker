import { defineStore } from 'pinia'
import { useReCaptcha } from 'vue-recaptcha-v3';

export const useTimeslotStore = defineStore('timeslots', {
    state: () => ({
        timeslots: [],
        gcTimeslots: [],
    }),
    actions: {
      async populateTimeslotStore() {
        if (this.timeslots.length == 0)
        {
          const recaptchaInstance = useReCaptcha();
          await recaptchaInstance?.recaptchaLoaded();
          const token = await recaptchaInstance?.executeRecaptcha('timeslots');

          const nuxtApp = useNuxtApp()
          const reqHeaders = useRequestHeaders(['Cookie'])
          const buffer = await $fetch('/api/timeslots', { method: 'POST', headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer', body: {token: token}})
          const timeslotData = nuxtApp.$unpack(buffer)
  
          this.timeslots = timeslotData
          this.gcTimeslots = timeslotData.filter(value => value['gc_available'])
        }
      }
    },
})