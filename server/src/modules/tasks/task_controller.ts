import type { Request, Response } from 'express'
import { taskServices } from './task_services.js'
import { z } from 'zod'
import { projectIdParamSchema, createTaskSchema, taskIdParamSchema, taskQuerySchema, updateTaskStatusSchema } from '../../schemas/taskSchemas.js'

export const taskController = {
    getTasksByProjectId: async(req: Request, res: Response) => {
        const parsedParams = projectIdParamSchema.safeParse(req.params)
        if(!parsedParams.success){
            return res.status(400).json({error: z.treeifyError(parsedParams.error)})
        }
        
        const parsedQuery = taskQuerySchema.safeParse(req.query)
        if(!parsedQuery.success){
            return res.status(400).json({error: z.treeifyError(parsedQuery.error)})
        }       
        
        try {
            const tasks = await taskServices.getTasksByProjectId(parsedParams.data.projectId, parsedQuery.data)
            return res.status(200).json(tasks)
        } catch (error) {
            console.error('Error fetching tasks:', error)
            return res.status(500).json({ error: 'Failed to fetch tasks' })
        }
    },

    createTask: async(req: Request, res: Response) => {
        
        const parsedBody = createTaskSchema.safeParse(req.body)
        if(!parsedBody.success){
            return res.status(400).json({error: z.treeifyError(parsedBody.error)})
        }

        const parsedParams = projectIdParamSchema.safeParse(req.params)
        if(!parsedParams.success){
            return res.status(400).json({error: z.treeifyError(parsedParams.error)})
        }
       
        try {
            const task = await taskServices.createTask(parsedParams.data.projectId, parsedBody.data)
            return res.status(201).json(task)
        } catch (error) {
            console.error('Error creating task:', error)
            return res.status(500).json({ error: 'Failed to create task' })
        }
    },
    
    updateTask: async(req: Request, res: Response) => {

        const parsedParams = taskIdParamSchema.safeParse(req.params)
        if(!parsedParams.success){
            return res.status(400).json({error: z.treeifyError(parsedParams.error)})
        }

        const parsedBody = updateTaskStatusSchema.safeParse(req.body)
        if(!parsedBody.success){
            return res.status(400).json({error: z.treeifyError(parsedBody.error)})
        }

        try{
            const updatedTask = await taskServices.updateTaskStatus(parsedParams.data.id, parsedBody.data.status)
            return res.status(200).json(updatedTask)
        } catch (error:any){
            if(error.code === "P2025"){
                return res.status(404).json({error:'Task not found'})
            }
            console.error('Error updating task status:', error)
            return res.status(500).json({error: "failed to update task"})
        }


    },
    deleteTask: async(req: Request, res: Response) => {
    
        const parsedParams = taskIdParamSchema.safeParse(req.params)
        if(!parsedParams.success){
            return res.status(400).json({error: z.treeifyError(parsedParams.error)})
        }

        try{
            await taskServices.deleteTask(parsedParams.data.id)
            return res.status(204).send()
        } catch(error:any) {
            if(error.code === "P2025"){
                return res.status(404).json({error:'task resource not found'})
            }
             console.error('Error deleting task:', error)
            return res.status(500).json({error: "failed to delete task"})
        }
    },
    getTaskById: async(req:Request, res: Response) => {
        
        const parsedParams = taskIdParamSchema.safeParse(req.params)
        if(!parsedParams.success){
            return res.status(400).json({error: z.treeifyError(parsedParams.error)})
        }

        try{
            const task = await taskServices.getTaskById(parsedParams.data.id)
            if(!task){
                return res.status(404).json({error:'no task found with that id'})
            }
            return res.status(200).json(task)
        } catch(error:any){
            console.error(error)
            return res.status(500).json({error: "Failed to get task by task id"})
        }

    }
}