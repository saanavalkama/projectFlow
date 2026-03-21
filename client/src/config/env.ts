const apiBaseUrl = import.meta.env.VITE_API_BASE_URL 

interface Env{
    apiBaseUrl: string
}

if(!apiBaseUrl){
    throw new Error('VITE_API_BASE_URL is not defined in the environment variables')
}

export const env:Env = {
    apiBaseUrl
}