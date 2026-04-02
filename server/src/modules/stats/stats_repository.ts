import { prisma } from "../../lib/prisma.js";


export const StatsRepository = {

    totalTasks: async (projectId?: string) =>  {
        return await prisma.task.count(
            {
             ...(projectId ? {where: {projectId}} : {})
            }
        )
    },

    doneTasks: async (projectId?: string) => {
        return await prisma.task.count({
            where: {
                status: "DONE",
                ...(projectId ? {projectId} : {})
            }
        })
    }, 


    overdueTasks: async (projectId?: string) => {
        const now = new Date()
        return await prisma.task.count({
            where: {
                ...(projectId ? {projectId} : {}),
                dueDate: {
                    lt: now
                },
                status: {
                    not: "DONE"
                }
            }
        })
    }, 

    statusDistribution: async (projectId?: string) => {
        return await prisma.task.groupBy({
            by: ['status'],
            _count: {
                id: true
            },
            where: {
                ...(projectId ? {projectId} : {})
            }
        }) 
    },
    
    projects: async () => { 
      return await prisma.project.findMany({
        include: {
            _count: {
                select:{
                    task: true
                }
            }
        }
      })
    },

    tasksByWeek: async (projectId?: string) => {
        if (projectId) {
            return await prisma.$queryRaw`
                SELECT 
                    DATE_TRUNC('week', "createdAt") AS week,
                    COUNT(*) AS count
                FROM "Task"
                WHERE "projectId" = ${projectId}
                GROUP BY week
                ORDER BY week ASC
                `
        }

        return await prisma.$queryRaw`
            SELECT 
                DATE_TRUNC('week', "createdAt") AS week,
                COUNT(*) AS count
            FROM "Task"
            GROUP BY week
            ORDER BY week ASC
        `
    }
}