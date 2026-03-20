import { projectServices } from "./project_services.js";
import { Request, Response } from "express";

export const projectController = {
    createProject: async (req: Request, res: Response ) => {
        
        const { name, description } = req.body
        try {
            const project = await projectServices.createProject(name, description)
            res.status(201).json(project)
        } catch (error) {
            console.error('Error creating project:', error)
            res.status(500).json({ error: 'Failed to create project' })
        }  
    },
    getAllProjects: async (req: Request, res: Response) => {
        
        try {
            const projects = await projectServices.getAllProjects()
            res.status(200).json(projects)
        } catch (error) {
            console.error('Error fetching projects:', error)
            res.status(500).json({ error: 'Failed to fetch projects' })
        }
    }
}