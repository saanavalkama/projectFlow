import { useQuery } from "@tanstack/react-query"
import { authService } from "../services/authService"
import type { UserProfile } from "../types/authTypes"
import axios from "axios"

export const useMe = () => {
  return useQuery<UserProfile | null>({
    queryKey: ["me"],
    queryFn:async()=>{
        try{
            const user = await authService.me()
            return user
        } catch(err){
            if(axios.isAxiosError(err) && err.response?.status === 401 ) return null
            throw err
        }
    },
    staleTime: Infinity,
    retry: false,
  })
}