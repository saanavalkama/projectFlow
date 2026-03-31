import type { Request, Response } from 'express'
import { taskServices } from './task_services.js'
import { NewTask, TaskQuery, UpdateTaskStatus } from '../../schemas/taskSchemas.js'

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
        const task = await taskServices.createTask(projectId, data)
        return res.status(201).json(task)  
    },
    
    updateTask: async(req: Request, res: Response) => {
        const {id} = req.params as {id: string}
        const {status} = req.body as UpdateTaskStatus
        const updatedTask = await taskServices.updateTaskStatus(id, status)
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
    }
}