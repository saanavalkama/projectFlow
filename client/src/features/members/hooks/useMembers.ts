import { useQuery } from "@tanstack/react-query"
import { memberServices } from "../services/memberServices"

export const useMembers = (projectId: string) => {
    return useQuery({
        queryKey:['members',projectId],
        queryFn: () => memberServices.getMembers(projectId)
    })
}