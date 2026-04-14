import { prisma } from "../../lib/prisma.js";
import { ProjectBody, ProjectQuery } from "../../schemas/projectSchemas.js";

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

    getAllProjects: async (userId: string, query: ProjectQuery) => {
      const filters = {
        ALL: { OR: [{ ownerId: userId }, { members: { some: { userId } } }] },
        OWN: { ownerId: userId },
        MEMBER: { members: { some: { userId } } }
      }

      const where = filters[query.query ?? "ALL"]

      return prisma.project.findMany({ where })
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