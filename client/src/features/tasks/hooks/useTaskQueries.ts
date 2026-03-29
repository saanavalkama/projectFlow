import { useQuery } from "@tanstack/react-query"
import { taskServices } from "../services/taskService"
import type { TaskStatus } from "../types/types"

export const useTasks = (projectId:string, status: TaskStatus | undefined, search: string | undefined) => {
    return useQuery({
        queryKey: ['tasks',projectId, status,search],
        queryFn:()=>taskServices.getTasksByProjectId(projectId, status, search),
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