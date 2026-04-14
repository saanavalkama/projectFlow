import { NotFoundError } from "../../errors/AppError.js";
import { ProjectBody, ProjectQuery} from "../../schemas/projectSchemas.js";
import {projectRepository} from "./project_repository.js";

export const projectServices = {
    createProject: async (data: ProjectBody, ownerId: string) => {
        return await projectRepository.createProject(data, ownerId)
    },

    getAllProjects: async (userId: string, query: ProjectQuery) => {
        return await projectRepository.getAllProjects(userId,query)
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



