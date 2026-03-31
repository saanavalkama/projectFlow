import  {TaskQuery, UpdateTaskStatus } from "../../schemas/taskSchemas.js"
import { prisma } from "../../lib/prisma.js";
import { NewTask } from "../../schemas/taskSchemas.js";
    
export const taskRepository = {

    getTasksByProjectId: async(projectId: string, data: TaskQuery) => {
        const {status, search} = data
        const where = {
            projectId,
            ...(status && {status}),
            ...(search && {title: {contains: search, mode: 'insensitive' as const}})
        }
        return prisma.task.findMany({where})
    },

    createTask: async (projectId: string, data: NewTask) => {
        return await prisma.task.create({
            data: {
                projectId,
                ...data
            }
        })
    },
    getTaskById: async (id: string) => {
        return await prisma.task.findUnique({
            where:{
                id
            }
        })
    },


    updateTaskStatus: async(id:string, status:UpdateTaskStatus['status']) => {
        return await prisma.task.update({
            where:{
                id
            },
            data:{
                status
            }
        })
    },

    deleteTask: async(id:string) => {
        return await prisma.task.delete({
            where: {
                id
            }
        })
    }
}