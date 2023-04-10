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
    ],
    callbacks: {
        session: async ({ session, token, user })=> {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user.id = token.id
            
            return session
        },
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
              //token.accessToken = account.access_token
              token.id = profile.id
            }
            return token
          }
      },
      
})