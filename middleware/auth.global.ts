export default defineNuxtRouteMiddleware((to, from) => {
  // This is global middleware that runs on every req (page navigation)
  /*
    const { status, data, signIn } = useAuth()

    // Check if authentication is turned off, or if authenticated
    // Return immeadiatly if user is already authenticated
    console.log('middleware:')
    console.log(!(useRuntimeConfig().public.enableAuth))
    console.log((status.value === 'authenticated'))
    if (!(useRuntimeConfig().public.enableAuth) || (status.value === 'authenticated')) {
      return
    }
    */

    /**
     * We cannot directly call and/or return `signIn` here as `signIn` uses async composables under the hood, leading to "nuxt instance undefined errors", see https://github.com/nuxt/framework/issues/5740#issuecomment-1229197529
     *
     * So to avoid calling it, we return it immeadiatly.
     */
    /*
    return signIn(undefined, { callbackUrl: to.path }) as ReturnType<typeof navigateTo>
    */
   return
})