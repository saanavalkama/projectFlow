import type { Request, Response } from 'express'
import { taskServices } from './task_services.js'
import { NewTask, ProjectTaskUserParams, TaskQuery, UpdateTaskStatus } from '../../schemas/taskSchemas.js'
import { ForbiddenError, UnauthorizedError } from '../../errors/AppError.js'

//NOTE: 
//1. All validation is done in the routes using the validate middleware, so we can assume that the data is valid in the controller and directly use it.
//2. The controller is only responsible for handling the request and response, and calling the appropriate service functions. All business logic is handled in the services.

export const taskController = {
    
    getTasksByProjectId: async(req: Request, res: Response) => {
        const {projectId} = req.params as {projectId: string}
        const data = req.query as TaskQuery
        const tasks = await taskServices.getTasksByProjectId(projectId, data)
        return res.status(200).json(tasks)
       
    },

    createTask: async(req: Request, res: Response) => {
        const data = req.body as NewTask
        const {projectId} = req.params as {projectId: string}
        const {userId, username} = req.session
        if(!userId || !username) throw new UnauthorizedError("Not logged in")
        const task = await taskServices.createTask(userId, username, projectId, data)
        return res.status(201).json(task)  
    },
    
    updateTask: async(req: Request, res: Response) => {
        
        const {userId, username} = req.session
        if(!userId || !username) throw new UnauthorizedError("Must be logged in")
        const isOwnerOrAdmin = req.projectRole === "ADMIN" || req.projectRole === "OWNER"
        const {id, projectId} = req.params as {id: string, projectId:string}
        const {status} = req.body as UpdateTaskStatus
        const updatedTask = await taskServices.updateTaskStatus({id, status, userId, username, isOwnerOrAdmin, projectId})
        return res.status(200).json(updatedTask)
    },
    
    deleteTask: async(req: Request, res: Response) => {
        const {id} = req.params as {id: string}
        await taskServices.deleteTask(id)
        return res.status(204).send()
    },
    
    getTaskById: async(req:Request, res: Response) => {
        const {id} = req.params as {id: string}
        const task = await taskServices.getTaskById(id)
        return res.status(200).json(task)
    },

    assignToTask: async(req:Request, res:Response) => {
        const {userId, username} = req.session
        if(!userId || !username) throw new UnauthorizedError("User not logged in")
        const {id, projectId} = req.params as {id:string, projectId:string}
        const assignee = await taskServices.assignToTask(id, userId, username, projectId)
        return res.status(201).json(assignee)
    },

    unassignFromTask: async(req:Request, res:Response) => {
        const data = req.params as ProjectTaskUserParams
        const username = req.session.username
        if(!username) throw new UnauthorizedError("User must be logged in")
       
        //check permission
        const requestUserId = req.session.userId
        const userUnassigningThemselves = data.userId === requestUserId
        const isOwnerOrAdmin = req.projectRole === "OWNER" || req.projectRole === "ADMIN"
        if(!userUnassigningThemselves && !isOwnerOrAdmin){
            throw new ForbiddenError("No priviledges to delete member")
        }

        await taskServices.unassignFromTask(data, username)
        return res.status(204).send()
    }

}