import {projectRepository} from "./project_repository.js";

export const projectServices = {
    createProject: async (name: string, description: string) => {
        return await projectRepository.createProject(name, description)
    },
    getAllProjects: async () => {
        return await projectRepository.getAllProjects()
    },
    deleteProject: async (id: string) => {
        const deletedCount = await projectRepository.deleteProject(id)
        return deletedCount
    },
    updateProject: async (id: string, name: string, description: string) => {
        return await projectRepository.updateProject(id, name, description)
    },
    getProjectById: async (id: string) => {
        return await projectRepository.getProjectById(id)
    }
}



