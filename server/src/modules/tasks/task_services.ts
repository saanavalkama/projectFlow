import { TaskStatus } from "../../generated/prisma/enums.js";
import { taskRepository } from "./task_respository.js";

export const taskServices = {

    getTasksByProjectId: async (projectId: string, status?:string) => {

        if(status !== undefined && !Object.values(TaskStatus).includes(status as TaskStatus)){
            throw new Error("malformatted status")
        }
        const validStatus = status ? status as TaskStatus : undefined

        return await taskRepository.getTasksByProjectId(projectId, validStatus)
    },

    createTask: async (projectId: string, title: string, details: string) => {
        return await taskRepository.createTask(projectId, title, details)
    },
    getTaskById: async(id:string) => {
        return await taskRepository.getTaskById(id)
    },

    updateTaskStatus: async(id:string, status: TaskStatus)=>{
        return await taskRepository.updateTaskStatus(id, status)
    },
    
    deleteTask: async(id:string) => {
        return await taskRepository.deleteTask(id)
    }
}