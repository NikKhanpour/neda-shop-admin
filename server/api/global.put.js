export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const body = await readBody(event)
    const token = getCookie(event, 'panel-token')
    const query = getQuery(event);
    try {
        const data = await $fetch(`${apiBase}${query.url}`, {
            method: 'PUT',
            body,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return data.data
    } catch (error) {
        return error
    }
})