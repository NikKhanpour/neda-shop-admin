export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const token = getCookie(event, 'panel-token')
    try {
        const data = await $fetch(`${apiBase}/auth/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        setCookie(event, 'panel-token', '', {
            httpOnly: true,
            maxAge: new Date(0),
            path: '/'
        })
        return data
    } catch (error) {
        return error
    }
})