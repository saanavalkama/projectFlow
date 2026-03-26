import {api} from "../../../lib/api";
import type { Task, NewTask, UpdateTaskStatusInput } from "../types/types";

export const taskServices = {

    createTask: async (data: NewTask) : Promise<Task> => {
            const response = await api.post<Task>(`/projects/${data.projectId}/tasks`, data)
            return response.data
    },

    getTasksByProjectId: async (projectId: string) : Promise<Task[]> => {
        const response = await api.get<Task[]>(`/projects/${projectId}/tasks`)
        return response.data
    }, 

    getTaskById: async(id:string):Promise<Task> => {
        const response = await api.get<Task>(`/tasks/${id}`)
        return response.data
    }, 

    updateTaskStatus: async(data: UpdateTaskStatusInput):Promise<Task> => {
        const response = await api.put<Task>(`/tasks/${data.id}`,data)
        return response.data
    },

    deleteTask: async(id:string):Promise<void> => {
        return await api.delete(`/tasks/${id}`)
        
    }
}