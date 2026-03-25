import { prisma } from "../../lib/prisma.js";
    
export const taskRepository = {
    
    getTasksByProjectId: async(projectId: string) => {
        return await prisma.task.findMany({
            where: {
                projectId
            }
        })
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
    }
}