// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    css: [
        "primevue/resources/themes/viva-dark/theme.css",
        "primevue/resources/primevue.css",
        "primeicons/primeicons.css"
    ],
	build: {
		transpile: ["primevue"]
	},
    modules: [
        '@pinia/nuxt',
        '@sidebase/nuxt-auth',
        '@nuxtjs/device',
    ],
    runtimeConfig: {
        clientKey: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        secret: process.env.SECRET,
    },
    auth: {
        enableGlobalAppMiddleware: false
    },
    nitro: {
        output: {
            dir: 'output',
            serverDir: 'output/server',
            publicDir: 'output/public'
        }
    }
})
