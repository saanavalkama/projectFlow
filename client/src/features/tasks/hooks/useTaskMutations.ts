import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskServices } from "../services/taskService"
import type { DeleteTaskInput, NewTask, UpdateTaskStatusInput } from "../types/types"

type NewTaskWithProjectId = {
    projectId: string, 
    data:NewTask
}

export const useCreateTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({projectId, data} : NewTaskWithProjectId )=>{
            return taskServices.createTask(projectId,data)
        },
        onSuccess: (_,{projectId}) => {
            queryClient.invalidateQueries({queryKey:['tasks',projectId]})
        }
    })
}

export const useUpdateTaskStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(data:UpdateTaskStatusInput)=>taskServices.updateTaskStatus(data),
        onSuccess:(_,{projectId, id})=>{
            queryClient.invalidateQueries({queryKey:['tasks',projectId]})
            queryClient.invalidateQueries({queryKey:['task', id]})
        }
    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:DeleteTaskInput)=>taskServices.deleteTask(data.id),
        onSuccess:(_,{projectId, id})=>{
            queryClient.removeQueries({queryKey:['task',id]})
            queryClient.invalidateQueries({queryKey:['tasks',projectId]})
        }
    })
}