import {api} from "../../../lib/api";
import type { Task, TaskWithAssignees, NewTask, UpdateTaskStatusInput, TaskStatus, TaskAssignee } from "../types/types";

export const taskServices = {

    createTask: async (projectId: string, data: NewTask): Promise<Task> => {
        const response = await api.post<Task>(`/projects/${projectId}/tasks`, data)
        return response.data
    },

    getTasksByProjectId: async (projectId: string, status?: TaskStatus, search?: string): Promise<Task[]> => {
        const response = await api.get<Task[]>(`/projects/${projectId}/tasks`, {
            params: {status, search}
        })
        return response.data
    },

    getTaskById: async (projectId: string, id: string): Promise<TaskWithAssignees> => {
        const response = await api.get<TaskWithAssignees>(`/projects/${projectId}/tasks/${id}`)
        return response.data
    },

    updateTaskStatus: async (data: UpdateTaskStatusInput): Promise<Task> => {
        const response = await api.put<Task>(`/projects/${data.projectId}/tasks/${data.id}`, data)
        return response.data
    },

    deleteTask: async (projectId: string, id: string): Promise<void> => {
        return await api.delete(`/projects/${projectId}/tasks/${id}`)
    },

    assignToTask: async(projectId: string, id:string):Promise<TaskAssignee> => {
        const response = await api.post<TaskAssignee>(`/projects/${projectId}/tasks/${id}/assign`)
        return response.data
    },

    unassignFromTask: async(projectId:string, id:string, userId:string) => {
         await api.delete(`/projects/${projectId}/tasks/${id}/assignees/${userId}`)
    }
}
