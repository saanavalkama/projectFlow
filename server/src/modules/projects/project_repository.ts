import { create } from "node:domain";
import { prisma } from "../../lib/prisma.js";

export const projectRepository = {
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
    }
}