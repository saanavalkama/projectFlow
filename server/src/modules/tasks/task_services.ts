import { taskRepository } from "./task_respository.js";

export const taskServices = {
    
    getTasksByProjectId: async (projectId: string) => {
        return await taskRepository.getTasksByProjectId(projectId)
    },

    createTask: async (projectId: string, title: string, details: string) => {
        return await taskRepository.createTask(projectId, title, details)
    }
}