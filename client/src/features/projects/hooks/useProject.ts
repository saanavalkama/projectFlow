import { useQuery } from "@tanstack/react-query"
import { projectServices } from "../services/projectServices"

export const useProject = (id:string | undefined) => {
    return useQuery({
        queryKey:['project',id],
        queryFn: () => {
            return projectServices.getProjectById(id as string)
        },
        enabled:!!id,
        staleTime: 1000 * 60 * 5
    })
}