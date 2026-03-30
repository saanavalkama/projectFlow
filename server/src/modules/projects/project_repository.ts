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
    createProject: async (data: ProjectBody) => {
        return await prisma.project.create({data})
    },
    getAllProjects: async () => {
        return await prisma.project.findMany({
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