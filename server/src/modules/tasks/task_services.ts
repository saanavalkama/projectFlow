import { taskRepository } from "./task_respository.js";
import type { NewTask, TaskQuery, UpdateTaskStatus } from "../../schemas/taskSchemas.js";
import { NotFoundError } from "../../errors/AppError.js";


export const taskServices = {

    getTasksByProjectId: async (projectId: string, data: TaskQuery ) => {
        return await taskRepository.getTasksByProjectId(projectId, data)
    },

    createTask: async (projectId: string, data: NewTask) => {
        return await taskRepository.createTask(projectId, data)
    },
    getTaskById: async(id:string) => {
        const task =  await taskRepository.getTaskById(id)
        if(!task){
            throw new NotFoundError("Task")
        }
        return task
    },

    updateTaskStatus: async(id:string, status: UpdateTaskStatus['status'])=>{
        return await taskRepository.updateTaskStatus(id, status)
    },
    
    deleteTask: async(id:string) => {
        return await taskRepository.deleteTask(id)
    }
}