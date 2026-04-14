import type { ActivityLog } from "@/features/projects/types/types"
import { api } from "@/lib/api"

export const activityServices = {
     
    getActivityLog: async(projectId:string) : Promise<ActivityLog[]> => {
        const response = await api.get<ActivityLog[]>(`/projects/${projectId}/activity`)
        console.log(response.data)
        return response.data
    }
}