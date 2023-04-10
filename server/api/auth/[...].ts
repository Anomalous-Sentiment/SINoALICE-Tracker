import { NuxtAuthHandler } from '#auth'
import DiscordProvider from 'next-auth/providers/discord'
export default NuxtAuthHandler({
    secret: useRuntimeConfig().secret,
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        DiscordProvider.default({
           clientId: useRuntimeConfig().clientKey,
           clientSecret: useRuntimeConfig().clientSecret
        })
    ]
})