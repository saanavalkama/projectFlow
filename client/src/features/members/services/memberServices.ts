import { api } from "@/lib/api"
import type {MemberResponse, AddMemberData} from '../types/memberTypes'

export const memberServices = {
    getMembers: async(projectId:string):Promise<MemberResponse[]> => {
        const response = await api.get<MemberResponse[]>(`/projects/${projectId}/members`)
        return response.data
    },

    addMember: async(projectId:string, data:AddMemberData):Promise<MemberResponse> => {
        const response = await api.post<MemberResponse>(`/projects/${projectId}/members`, data)
        return response.data
    },

    deleteMember: async(projectId:string, userId:string):Promise<void> => {
        await api.delete(`/projects/${projectId}/members/${userId}`)
    }
}