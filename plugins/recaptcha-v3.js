import { defineNuxtPlugin } from "#app";
import { VueReCaptcha } from 'vue-recaptcha-v3';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueReCaptcha, {
        siteKey: useRuntimeConfig().public.siteKey,
        loaderOptions: {
            useEnterprise: true
        }
    });
});