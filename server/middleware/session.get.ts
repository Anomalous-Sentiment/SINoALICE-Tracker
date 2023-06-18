import { getServerSession } from '#auth'

// Middleware for protecting API endpoints. This depends on all API endpoints using POST requests. (If it runs on GET requests, then it may block navigation to the sign in page, preventing any access)
export default eventHandler(async (event) => {
    //Check if the request is a GET to api/auth/session
    if (getMethod(event) === 'GET' && getRequestURL(event).pathname === '/api/auth/session' && getQuery(event).callbackUrl)
    {
        console.log('API route matched')
        console.log('GET request to api/auth/session with callbackUrl detected')
        // Redirect to URL, but without the callbackUrl (It seems to cause INVALID_CALLBACK_URL error when it is not localhost in production)
        await sendRedirect(event, '/api/auth/session', 302)
    }
})