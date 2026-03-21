import {api} from "../../../lib/api";
import type { Project } from "../types/types";

export const projectServices = {

    createProject: async (name: string, description: string) : Promise<Project> => {
            const response = await api.post("/projects", { name, description })
            return response.data
        
    },
    getAllProjects: async () : Promise<Project[]> => {
        const response = await api.get("/projects")
        return response.data
    }
}