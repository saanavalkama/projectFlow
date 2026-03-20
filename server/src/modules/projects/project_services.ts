import {projectRepository} from "./project_repository.js";

export const projectServices = {
    createProject: async (name: string, description: string) => {
        return await projectRepository.createProject(name, description)
    },
    getAllProjects: async () => {
        return await projectRepository.getAllProjects()
    }
}