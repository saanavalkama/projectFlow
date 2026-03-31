import { NotFoundError } from "../../errors/AppError.js";
import { ProjectBody} from "../../schemas/projectSchemas.js";
import {projectRepository} from "./project_repository.js";

export const projectServices = {
    createProject: async (data: ProjectBody) => {
        return await projectRepository.createProject(data)
    },

    getAllProjects: async () => {
        return await projectRepository.getAllProjects()
    },

    deleteProject: async (id: string) => {
        return  await projectRepository.deleteProject(id)
    },

    updateProject: async (id:string, data: ProjectBody) => {
        return await projectRepository.updateProject(id, data)
    },
    
    getProjectById: async (id: string) => {
        const project =  await projectRepository.getProjectById(id)
        if(!project){
            throw new NotFoundError("Project")
        }
        return project
    }
}



