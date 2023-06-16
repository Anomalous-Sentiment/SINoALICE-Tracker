import { defineStore } from 'pinia'
import { useReCaptcha } from 'vue-recaptcha-v3';

export const useGuildStore = defineStore('guilds', {
    state: () => ({
        guilds: [],
    }),
    actions: {
      setGuilds(guildList) {
        this.guilds = guildList
      },
      async populateGuildStore() {
        if (this.guilds.length == 0)
        {
          const recaptchaInstance = useReCaptcha();
          await recaptchaInstance?.recaptchaLoaded();

          // get the token, a custom action could be added as argument to the method
          const token = await recaptchaInstance?.executeRecaptcha('guilds');
          
          console.log('ReCaptcha token:', token)

          const nuxtApp = useNuxtApp()
          const reqHeaders = useRequestHeaders(['Cookie'])
          const buffer = await $fetch('/api/guild-data', { method: 'POST', body: {token: token}, headers: {Accept: 'application/octet-stream', Cookie: reqHeaders.cookie}, responseType: 'arrayBuffer'})
          const data = nuxtApp.$unpack(buffer)
  
          this.guilds = data
        }
      }
    },
})