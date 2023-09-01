import { Countdown } from 'vue3-flip-countdown'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Countdown', Countdown);
});