import { useMutation, useQueryClient } from "@tanstack/react-query"
import { memberServices } from "../services/memberServices"
import type { AddMemberData, MemberResponse } from "../types/memberTypes"
import { toast } from "sonner"
import { getErrorMessage } from "@/utils/getErrorMessage"

export const useAddMemberMutations = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({projectId, data}:{projectId:string, data:AddMemberData}) => memberServices.addMember(projectId, data),
        onSuccess: (newMember, {projectId}) => {
            queryClient.setQueryData(['members', projectId],(old:MemberResponse[])=>{
                return [...(old ?? []), newMember]
            }),
            queryClient.invalidateQueries({queryKey:['activityLog',projectId]})
            toast.success("New member added to project")
        },
        onError: (err)=>{
            toast.error(getErrorMessage(err,"Failed to add new member"))
        }
    })
}

export const useMemberDeletion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({projectId, userId}:{projectId:string, userId:string})=>memberServices.deleteMember(projectId,userId),
        onSuccess:(_,{projectId})=>{
            queryClient.invalidateQueries({queryKey:['members', projectId]})
            toast.success("Member Deleted")
        },
        onError:(err)=>toast.error(getErrorMessage(err,"Member deletion failed"))
     })
}