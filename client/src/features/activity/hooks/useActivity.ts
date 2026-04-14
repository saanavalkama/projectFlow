import { useQuery } from "@tanstack/react-query"

import { activityServices } from "../services/activityService"

export const useActivity = (projectId:string) => {
    return useQuery({
        queryKey:['activityLog',projectId],
        queryFn:() => activityServices.getActivityLog(projectId),
        enabled:!!projectId,
        staleTime: 10*1000
    })
}