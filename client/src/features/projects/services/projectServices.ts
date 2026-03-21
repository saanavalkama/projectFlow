import {api} from "../../../lib/api";
import type { Project, NewProject } from "../types/types";


export const projectServices = {

    createProject: async (data: NewProject) : Promise<Project> => {
            const response = await api.post<Project>("/projects", data)
            return response.data
        
    },

    getAllProjects: async () : Promise<Project[]> => {
        const response = await api.get<Project[]>("/projects")
        return response.data
    },

    deleteProject: async (id: string): Promise<void> => {
        return api.delete(`/projects/${id}`)
    }
}