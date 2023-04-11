import { NuxtAuthHandler } from '#auth'
import DiscordProvider from 'next-auth/providers/discord'
export default NuxtAuthHandler({
    secret: useRuntimeConfig().secret,
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        DiscordProvider.default({
           clientId: useRuntimeConfig().clientKey,
           clientSecret: useRuntimeConfig().clientSecret,
           authorization: { params: { scope: 'identify' } },

        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            console.log('Signin')
            console.log(user)

            // Make call to database to check if user is allowed to be signed in

            if (isAllowedToSignIn) {
              return true
            } else {
              // Return false to display a default error message
              return false
              // Or you can return a URL to redirect to:
              // return '/unauthorized'
            }
        },
        session: async ({ session, token, user })=> {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user.id = token.id
            session.user.discriminator = token.discriminator
            
            
            return session
        },
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
              //token.accessToken = account.access_token
              token.id = profile.id
              token.discriminator = profile.discriminator
            }
            return token
          }
      },
      
})