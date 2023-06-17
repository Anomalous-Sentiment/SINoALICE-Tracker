// Used to control whether authentication is enable or disabled (Both pages and API endpoints)
const enableAuthentication = true;

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
            // Used by middleware to determine whether authentication needs to be checked
            enableAuth: enableAuthentication,
        }
    },
    auth: {
        // Not sure if this does anything. Doesn't change anything in my testing (isEnabled)
        isEnabled: true,
        // This is named "globalAppMiddleware" incorrectly in the docs. This is the correct name
        enableGlobalAppMiddleware: false,
        defaultProvider: 'discord',
    },
    nitro: {
        output: {
            dir: '~/output',
            serverDir: '~/output/server',
            publicDir: '~/output/public'
        }
    },
})
