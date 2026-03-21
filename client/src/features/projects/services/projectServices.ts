import {api} from "../../../lib/api";
import type { Project, NewProject } from "../types/types";


export const projectServices = {

    createProject: async (data: NewProject) : Promise<Project> => {
            const response = await api.post("/projects", data)
            return response.data
        
    },
    getAllProjects: async () : Promise<Project[]> => {
        const response = await api.get("/projects")
        return response.data
    }
}