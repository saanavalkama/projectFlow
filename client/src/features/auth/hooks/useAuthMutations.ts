import {  useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginInput, RegisterInput } from "../types/authTypes";
import { authService } from "../services/authService";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";

export const useLogin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:LoginInput) => authService.login(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["me"]})
            toast.success("Login succesful")
        },
        onError:(err)=> toast.error(getErrorMessage(err,"Error while logging in"))
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: (data:RegisterInput) => authService.create(data),
        onSuccess:()=>toast.success("Register succesful"),
        onError:(err)=> toast.error(getErrorMessage(err, "Register failed"))
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:()=>authService.logout(),
        onSuccess:()=>{
          queryClient.clear()
          toast.success("You are logged out")
        },
        onError: (err)=>toast.error(getErrorMessage(err, "Logout failed"))
    })
}