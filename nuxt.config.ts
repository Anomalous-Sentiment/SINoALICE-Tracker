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
        // Configuration of the global auth-middleware (only applies if you set `globalAppMiddleware: true` above!)
        globalMiddlewareOptions: {
            // Whether to automatically set the callback url to the page the user tried to visit when the middleware stopped them. This is useful to disable this when using the credentials provider, as it does not allow a `callbackUrl`. Setting this to a string-value will result in that being used as the callbackUrl path. Note: You also need to set the global `addDefaultCallbackUrl` setting to `false` if you want to fully disable this for the global middleware.
            addDefaultCallbackUrl: true
        }
    },
    nitro: {
        output: {
            dir: '~/output',
            serverDir: '~/output/server',
            publicDir: '~/output/public'
        }
    },
})
