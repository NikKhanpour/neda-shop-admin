export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const body = await readBody(event);

    try {
        const data = await $fetch(`${apiBase}/auth/login`, {
            method: 'POST',
            body,
            headers: {
                'Accept': 'application/json'
            }
        })
        setCookie(event, 'panel-token', data.data.token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        })
        return data.data.user
    } catch (error) {
        return error
    }
})