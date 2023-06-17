import { getServerSession } from '#auth'

// Middleware for protecting API endpoints. This depends on all API endpoints using POST requests. (If it runs on GET requests, then it may block navigation to the sign in page, preventing any access)
export default eventHandler(async (event) => {
    const session = await getServerSession(event)

    //console.log(getRequestURL(event).pathname)
    // Create regex to treat '*' as a wildcard, and use to match the url path for authentication URLs
    const regexStr = '/api/auth/*'.replace(/\*/g, "[^ ]*");
    const regex = new RegExp(regexStr)
    //console.log(regex.test(getRequestURL(event).pathname))

    // Check if authentication required and if URL is not related to authentication, and not an error page
    // As we do not want to block access to authentication APIs, or errors
    if (useRuntimeConfig().enableAuth && !session && !regex.test(getRequestURL(event).pathname) && getRequestURL(event).pathname !== '/__nuxt_error') {
        console.log('Unauthenticated post req detected while authentication is required')
        console.log(event.node.req.url)
        console.log(getRequestPath(event))
        console.log(getRequestURL(event))

        // Return status 403 with error message if not authenticated when authentication is required
        throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
    }
})