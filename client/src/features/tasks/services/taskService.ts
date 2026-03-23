import {api} from "../../../lib/api";
import type { Task, NewTask } from "../types/types";

export const taskServices = {

    createTask: async (data: NewTask) : Promise<Task> => {
            const response = await api.post<Task>(`/projects/${data.projectId}/tasks`, data)
            return response.data
    },

    getTasksByProjectId: async (projectId: string) : Promise<Task[]> => {
        const response = await api.get<Task[]>(`/projects/${projectId}/tasks`)
        return response.data
    }
}