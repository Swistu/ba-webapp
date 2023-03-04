const baseUrl = "http://localhost:1337/api/";
const createFetchRequest = async (endpoint: string, params: Record<string, any>) => {
    // const token = "asdasd";
    const response = await fetch(`${baseUrl}${endpoint}`, {
        ...params,
        credentials: 'include',
        headers: {
            // ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...params?.headers ?? {},
        },
    });

    if (![200, 201, 304].includes(response.status)) {
        throw new Error('Could not communicate with API');
    }

    return { fetchStatus: response.status, ...(await response.json()) };
};

const directusApi = {
    get: (endpoint: string) => createFetchRequest(endpoint, { method: 'GET' }),
    post: (endpoint: string, data: Record<string, never> = {}) => createFetchRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }),
    delete: (endpoint: string) => createFetchRequest(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }),
    patch: (endpoint: string, data: Record<string, never> = {}) => createFetchRequest(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }),
};

export default directusApi;