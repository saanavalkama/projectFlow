import { prisma } from "../../lib/prisma.js";
import { ProjectBody } from "../../schemas/projectSchemas.js";

export const projectRepository = {
    deleteProject: async (id: string) => {
        return await prisma.project.delete({
            where: {
                id
            }
        })
    },
    createProject: async (data: ProjectBody, ownerId: string) => {
        return await prisma.project.create({ data: { ...data, ownerId } })
    },
    getAllProjects: async (userId: string) => {
        return await prisma.project.findMany({
            where: { ownerId: userId },
            orderBy: {
                createdAt: 'desc'
            }
        })
    },
    updateProject: async (id: string, data: ProjectBody) => {
        return await prisma.project.update({
            where: {
                id
            },
            data
        })
    },
    getProjectById: async(id:string) => {
        return await prisma.project.findUnique({
            where: {
                id
            }
        })
    }
    
}