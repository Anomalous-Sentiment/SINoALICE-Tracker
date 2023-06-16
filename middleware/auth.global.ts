export default defineNuxtRouteMiddleware((to, from) => {
  // This is global middleware that runs on every req (page navigation)
  // Currently not used, and using the nuxt.config.ts enableGlobalMiddleware option instead to achieve same results
    const { status, data, signIn } = useAuth()

    return

    // Return immeadiatly if user is already authenticated
    if (status.value === 'authenticated') {
      return
    }

    /**
     * We cannot directly call and/or return `signIn` here as `signIn` uses async composables under the hood, leading to "nuxt instance undefined errors", see https://github.com/nuxt/framework/issues/5740#issuecomment-1229197529
     *
     * So to avoid calling it, we return it immeadiatly.
     */
    return signIn(undefined, { callbackUrl: to.path }) as ReturnType<typeof navigateTo>
})