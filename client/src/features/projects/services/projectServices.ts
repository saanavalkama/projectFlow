import {api} from "../../../lib/api";
import type { Project, NewProject } from "../types/types";
import type { ActivityLog } from "../types/types";


export const projectServices = {


    createProject: async (data: NewProject) : Promise<Project> => {
            const response = await api.post<Project>("/projects", data)
            return response.data
        
    },

    getAllProjects: async (query?: "ALL" | "OWN" | "MEMBER") : Promise<Project[]> => {
        const response = await api.get<Project[]>("/projects", { params: query ? { query } : undefined })
        return response.data
    },

    deleteProject: async (id: string): Promise<void> => {
        return api.delete(`/projects/${id}`)
    },

    getProjectById: async (id: string): Promise<Project> => {
        const response = await api.get<Project>(`/projects/${id}`)
        return response.data
    },

    updateProject: async (id: string, data: {name: string, description?: string}): Promise<Project> => {
        const payload = {...data, description: data.description ?? ""}
        const response = await api.put<Project>(`/projects/${id}`, payload)
        return response.data
    },

   
}