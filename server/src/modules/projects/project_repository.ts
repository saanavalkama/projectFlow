import { prisma } from "../../lib/prisma.js";

export const projectRepository = {
    deleteProject: async (id: string) => {
        return await prisma.project.delete({
            where: {
                id
            }
        })
    },
    createProject: async (name: string, description: string) => {
        return await prisma.project.create({
            data: {
                name,
                description
            }
        })
    },
    getAllProjects: async () => {
        return await prisma.project.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    },
    
}