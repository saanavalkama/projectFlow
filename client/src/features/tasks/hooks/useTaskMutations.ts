import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { taskServices } from "../services/taskService"
import type { DeleteTaskInput, NewTask, UpdateTaskStatusInput } from "../types/types"
import {toast} from "sonner"
import { getErrorMessage } from "../../../utils/getErrorMessage"

type NewTaskWithProjectId = {
    projectId: string, 
    data:NewTask
}

interface UnassignData{
    projectId:string,
    id:string,
    userId: string
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

export const useAssingTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({projectId, id }: {projectId:string, id:string})=>taskServices.assignToTask(projectId, id),
        onSuccess:(_,{id,projectId})=> {
          queryClient.invalidateQueries({queryKey:['task',id]})
          queryClient.invalidateQueries({queryKey:["tasks", projectId]})
          toast.success("Assigned to the task")
        },
        onError:(err)=> toast.error(getErrorMessage(err,"Assigning to the task failed"))
    })
}

export const useUnassignFromTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:UnassignData)=> taskServices.unassignFromTask(data.projectId,data.id,data.userId),
        onSuccess: (_,{projectId,id}) => {
            queryClient.invalidateQueries({queryKey:['task',id]})
            queryClient.invalidateQueries({queryKey:['tasks',projectId]})
            toast.success("Unassigned from task")
        },
        onError: (err) => toast.error(getErrorMessage(err,"Unable to unassign from task"))
    })
}