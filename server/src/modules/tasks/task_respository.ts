import { title } from "node:process";
import { TaskStatus } from "../../generated/prisma/enums.js";
import { prisma } from "../../lib/prisma.js";
    
export const taskRepository = {

    getTasksByProjectId: async(projectId: string, status?:TaskStatus, search?: string) => {
        const where = {
            projectId,
            ...(status && {status}),
            ...(search && {title: {contains: search, mode: 'insensitive' as const}})
        }
        return prisma.task.findMany({where})
    },

    createTask: async (projectId: string, title: string, details: string) => {
        return await prisma.task.create({
            data: {
                projectId,
                title,
                details
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


    updateTaskStatus: async(id:string, status:TaskStatus) => {
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