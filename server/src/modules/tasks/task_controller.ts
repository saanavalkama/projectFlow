import type { Request, Response } from 'express'
import { taskServices } from './task_services.js'
import { TaskStatus } from '../../generated/prisma/enums.js'

export const taskController = {
    getTasksByProjectId: async(req: Request, res: Response) => {
        const { projectId } = req.params

        if (!projectId || typeof projectId !== "string") {
            return res.status(400).json({ error: 'Project ID is required' })
        }

        try {
            const tasks = await taskServices.getTasksByProjectId(projectId)
            res.status(200).json(tasks)
        } catch (error) {
            console.error('Error fetching tasks:', error)
            res.status(500).json({ error: 'Failed to fetch tasks' })
        }
    },

    createTask: async(req: Request, res: Response) => {
        
        const { title, details } = req.body
        const { projectId } = req.params

        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ error: 'Task title is required and must be a non-empty string' })
        }

        if(details !== undefined && typeof details !== 'string') {
            return res.status(400).json({ error: 'Details must be a string' })
        }

        if(!projectId || typeof projectId !== "string"){
            return res.status(400).json({ error: 'Project ID is required' })
        }

        const trimmedTitle = title.trim()
        const trimmedDetails = details?.trim() ?? ''

        try {
            const task = await taskServices.createTask(projectId, trimmedTitle, trimmedDetails)
            res.status(201).json(task)
        } catch (error) {
            console.error('Error creating task:', error)
            res.status(500).json({ error: 'Failed to create task' })
        }
    },
    updateTask: async(req: Request, res: Response) => {

        //frontend sending both id and status in body. Maybe tighten the logic

        const {id} = req.params
        const {status} = req.body

        if(!id || typeof id !== "string"){
            return res.status(400).json({error:'task id is required'})
        }

        if(typeof status !== "string" || !Object.values(TaskStatus).includes(status as TaskStatus)){
            res.status(400).json({error:'valid task status is required' })
        }

        const validStatus = status as TaskStatus

        try{
            const updatedTask = await taskServices.updateTaskStatus(id, validStatus)
            return res.status(200).json(updatedTask)
        } catch (error:any){
            if(error.code = "P2025"){
                return res.status(404).json({error:'Task not found'})
            }
            res.status(500).json({error: "failed to create task"})
        }


    },
    deleteTask: async(req: Request, res: Response) => {
    
        const {id} = req.params

        if(!id || typeof id !== "string"){
            return res.json(400).json({error:'id is required'})
        }

        try{
            await taskServices.deleteTask(id)
            res.status(204).send()
        } catch(error:any) {
            console.error(error)
            if(error.code === "P2025"){
                return res.status(404).json({error:'task resource not found'})
            }
            res.status(500).json({error: "failed to delete task"})
        }
    },
    getTaskById: async(req:Request, res: Response) => {
        
        const {id} = req.params

        if(!id || typeof id !== "string" ){
            return res.status(400).json({error:"task id is required"})
        }

        try{
            const task = await taskServices.getTaskById(id)
            return res.status(200).json(task)
        } catch(error:any){
            console.error(error)
            if(error.code === "P2025"){
                return res.status(404).json({error:'message not found'})
            }
            return res.status(500).json({error: "Failed to get task by taks id"})
        }

    }
}