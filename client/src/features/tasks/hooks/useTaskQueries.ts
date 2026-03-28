import { useQuery } from "@tanstack/react-query"
import { taskServices } from "../services/taskService"

export const useTasks = (projectId:string) => {
    return useQuery({
        queryKey: ['tasks',projectId],
        queryFn:()=>taskServices.getTasksByProjectId(projectId),
        enabled: !!projectId
    })
}

export const useTask = (taskId:string | undefined) => {
    return useQuery({
        queryKey:['task', taskId],
        queryFn:()=> taskServices.getTaskById(taskId as string),
        enabled: !!taskId
    })
}