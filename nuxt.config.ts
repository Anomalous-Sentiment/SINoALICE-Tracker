const enableAuthentication = false

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
          charset: 'utf-8',
          viewport: 'width=device-width, initial-scale=1',
        }
    },
    ssr: false,
    css: [
        "primevue/resources/themes/viva-dark/theme.css",
        "primevue/resources/primevue.css",
        "primeicons/primeicons.css",
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
        secretCaptchaKey: process.env.RECAPTCHA_SECRET_KEY,
        public: {
            siteKey: process.env.RECAPTCHA_SITE_KEY,
            // Used by middleware to determine whether authentication needs to be checked in server middleware for API routes
            enableAuth: enableAuthentication,
        }
    },
    auth: {
        // Not sure if this does anything. Doesn't change anything in my testing (isEnabled).
        // Leave as true because if false, will cause errors with imports
        isEnabled: true,
        // This is named "globalAppMiddleware" incorrectly in the docs. This is the correct name. Controle client side page authentication
        enableGlobalAppMiddleware: enableAuthentication,
    },
    nitro: {
        output: {
            dir: '~/output',
            serverDir: '~/output/server',
            publicDir: '~/output/public'
        }
    },
})
