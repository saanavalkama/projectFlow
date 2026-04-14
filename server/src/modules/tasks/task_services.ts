import { taskRepository } from "./task_respository.js";
import type { NewTask, ProjectTaskUserParams, TaskQuery, UpdateTaskStatus } from "../../schemas/taskSchemas.js";
import { ForbiddenError, NotFoundError } from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { activityRepository } from "../activity/activity_repository.js";
import { LogAction, TaskStatus } from "../../generated/prisma/enums.js";

interface UpdateTaskInput{
    id:string,
    status: TaskStatus,
    userId:string,
    username:string,
    isOwnerOrAdmin:boolean,
    projectId: string
}


export const taskServices = {

    getTasksByProjectId: async (projectId: string, data: TaskQuery ) => {
        return await taskRepository.getTasksByProjectId(projectId, data)
    },

    createTask: async (createdById:string, username:string, projectId: string, data: NewTask) => {
        
        //task creation logic
        const task =  await taskRepository.createTask(createdById, projectId, data)

        //log logic
        try{
            await activityRepository.createLog({
                action: LogAction.TASK_CREATED,
                projectId,
                metadata: {"taskName": task.title, "createdBy": username}
            })
        } catch(err){
            console.log(err)
        }
        
        return task

    },
    getTaskById: async(id:string) => {
        const task =  await taskRepository.getTaskById(id)
        if(!task){
            throw new NotFoundError("Task")
        }
        return task
    },

    updateTaskStatus: async({id, status,userId,username,isOwnerOrAdmin,projectId}:UpdateTaskInput)=>{

        //Update task logic
        const isAssignee = await taskRepository.isAssignee(id, userId)
        if(!isAssignee && !isOwnerOrAdmin){
            throw new ForbiddenError("No permission to update the task")
        }
        const updatedTask = await taskRepository.updateTaskStatus(id, status)

        //log activity => if fails won't disturb the main logic
        try{
            await activityRepository.createLog({
              action: LogAction.TASK_STATUS_CHANGED,
              projectId,
              metadata: {"taskName":updatedTask.title, "status":status, "changedBy":username}
            })
        } catch(err) {
            console.log(err)
        }
        

        return updatedTask
    },
    
    deleteTask: async(id:string) => {
        return await taskRepository.deleteTask(id)
    },

    assignToTask: async(id:string, userId:string, username: string,  projectId:string) => {
        const taskAssignee =  await taskRepository.assignToTask(id, userId)
        const task = await taskRepository.getTaskById(id)
        if(!task) throw new NotFoundError("Task")

        try{
            
            await activityRepository.createLog({
                action: LogAction.TASK_ASSIGNED,
                projectId,
                metadata:{"taskName": task.title, "assignee": username}
            })
        } catch(err){
            console.error(err)
        }
        return taskAssignee
    },

    unassignFromTask: async(data: ProjectTaskUserParams, username:string) => {

        const assignee =  await taskRepository.unassignFromTask(data)
        const task = await taskRepository.getTaskById(data.id)
        if(!task) throw new NotFoundError("Task")


        try{
            await activityRepository.createLog({
                action: LogAction.TASK_UNASSIGNED,
                projectId: data.projectId,
                metadata: {"taskName":task.title, unassignee: username}
            })
        } catch(err){
            console.error(err)
        }
        return assignee
    }
}