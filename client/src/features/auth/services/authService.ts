import { api } from "@/lib/api"
import type { RegisterInput, LoginInput, UserProfile, BaseUser } from "../types/authTypes"


export const authService = {
    create: async(data:RegisterInput):Promise<void> => {
        const response = await api.post<void>("/api/auth/register",data)
        return  response.data
    },

    login: async(data:LoginInput):Promise<BaseUser> => {
        const response = await api.post<BaseUser>("/api/auth/login",data)
        return response.data
    },

    me: async():Promise<UserProfile> => {
        const response = await api.get<UserProfile>("/api/auth/me")
        return response.data 
    },

    logout: async():Promise<void> => {
        await api.post("/api/auth/logout")
    }
}