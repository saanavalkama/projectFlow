import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskServices } from "../services/taskService"
import type { DeleteTaskInput, NewTask, UpdateTaskStatusInput } from "../types/types"
import {toast} from "sonner"
import { getErrorMessage } from "../../../utils/getErrorMessage"

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
            toast.success("Task created successfully!")
        }, 
        onError: (error) => {
            toast.error(getErrorMessage(error, "Failed to create task. Please try again."))
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
            toast.success("Task status updated successfully!")
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, "Failed to update task status. Please try again."))
        }
    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: DeleteTaskInput) => taskServices.deleteTask(data.projectId, data.id),
        onSuccess:(_,{projectId, id})=>{
            queryClient.removeQueries({queryKey:['task',id]})
            queryClient.invalidateQueries({queryKey:['tasks',projectId]})
            toast.success("Task deleted successfully!")
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, "Failed to delete task. Please try again."))
        }
    })
}