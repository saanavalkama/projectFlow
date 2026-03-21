import { projectServices } from "./project_services.js";
import { Request, Response } from "express";

export const projectController = {
    createProject: async (req: Request, res: Response ) => {
        
        const { name, description } = req.body

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: 'Project name is required and must be a non-empty string' })
        }

        if(description !== undefined && typeof description !== 'string') {
            return res.status(400).json({ error: 'Description must be a string' })
        }

        const trimmedName = name.trim()
        const trimmedDescription = description ? description.trim() : ''

        try {
            const project = await projectServices.createProject (trimmedName, trimmedDescription)
            res.status(201).json(project)
        } catch (error) {
            console.error('Error creating project:', error)
            res.status(500).json({ error: 'Failed to create project' })
        }  
    },
    getAllProjects: async (_req: Request, res: Response) => {
        
        try {
            const projects = await projectServices.getAllProjects()
            res.status(200).json(projects)
        } catch (error) {
            console.error('Error fetching projects:', error)
            res.status(500).json({ error: 'Failed to fetch projects' })
        }
    },
    deleteProject: async (req: Request, res: Response) => {
        const { id } = req.params

        if(!id || typeof id !== "string"){
            return res.status(400).json({error: "id not found or malformatted"})
        }

        try{
            await projectServices.deleteProject(id)
            res.status(204).send()
        }
        catch {

        }
    }
}