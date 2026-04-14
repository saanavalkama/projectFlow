import  {ProjectTaskUserParams, TaskQuery, UpdateTaskStatus } from "../../schemas/taskSchemas.js"
import { prisma } from "../../lib/prisma.js";
import { NewTask } from "../../schemas/taskSchemas.js";
import { ConflictError } from "../../errors/AppError.js";
    
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

    createTask: async (createdById:string,projectId: string, data: NewTask) => {
        return await prisma.task.create({
            data: {
                createdById,
                projectId,
                ...data
            }
        })
    },

    getTaskById: async (id: string) => {
        return await prisma.task.findUnique({
            where:{
                id
            },
            include:{taskAssignees:{
                include:{
                    user: {
                        select:{id:true, name:true, email:true}
                    }
                }
            }}
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
    },


    assignToTask: async(id:string, userId:string) => {
        return prisma.taskAssignee.create({
            data: {taskId:id, userId}
        })
    },

    unassignFromTask: async(data:ProjectTaskUserParams) => {
        const userId = data.userId
        const taskId = data.id
        return prisma.taskAssignee.delete({
            where: {
                userId_taskId: {userId,taskId}
            }
        })
    },

    isAssignee: async(id:string, userId:string) => {
        return prisma.taskAssignee.findUnique({
            where:{
                userId_taskId:{userId,taskId:id}
            }
        })
    },

    taskDueTomorrow: async() => {
        const todayStarts = new Date()
        todayStarts.setHours(0,0,0,0)

        const tomorrowStarts = new Date(todayStarts)
        tomorrowStarts.setDate(tomorrowStarts.getDate()+1)

        const tomorrowEnds = new Date(tomorrowStarts)
        tomorrowEnds.setDate(tomorrowEnds.getDate()+1)

        return prisma.task.findMany({
            where: {
                dueDate:{
                    not:null,
                    gte:tomorrowStarts,
                    lt: tomorrowEnds
                },
                reminderSendAt:null
            }
        })
    }, 

    markReminderSent: async(id:string) => {
        const now = new Date()
        await prisma.task.update({
            where: {id},
            data: {
                reminderSendAt: now
            }
        })
    }
}