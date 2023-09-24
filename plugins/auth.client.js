export default defineNuxtPlugin(async (nuxtApp) => {
    const { authUser } = useAuth()
    const token = localStorage.getItem('panel-token')
    const { public: { apiBase } } = useRuntimeConfig()
    try {
        const user = await $fetch(`${apiBase}/auth/me`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        authUser.value = user.data
    } catch (error) {
        if (error.statusCode == 401) {
            localStorage.removeItem('panel-token')
        }
        return error
    }
})