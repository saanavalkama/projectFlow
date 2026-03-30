import { projectServices } from "./project_services.js";
import { Request, Response } from "express";
import { projectBodySchema, idParamSchema } from "../../schemas/projectSchemas.js";
import { z } from "zod";

export const projectController = {
    createProject: async (req: Request, res: Response ) => {
        
        const parsed = projectBodySchema.safeParse(req.body)

        if(!parsed.success){
            return res.status(400).json({error:z.treeifyError(parsed.error)})
        }

        try {
            const project = await projectServices.createProject (parsed.data)
            return res.status(201).json(project)
        } catch (error) {
            console.error('Error creating project:', error)
            return res.status(500).json({ error: 'Failed to create project' })
        }  
    },
    getAllProjects: async (_req: Request, res: Response) => {
        
        try {
            const projects = await projectServices.getAllProjects()
            return res.status(200).json(projects)
        } catch (error) {
            console.error('Error fetching projects:', error)
            return res.status(500).json({ error: 'Failed to fetch projects' })
        }
    },
    deleteProject: async (req: Request, res: Response) => {
        
        const parsed = idParamSchema.safeParse(req.params)

        if(!parsed.success){
            return res.status(400).json({error:z.treeifyError(parsed.error)})
        }

        try{
            await projectServices.deleteProject(parsed.data.id)            
            return res.status(204).send()
        }
        catch(error:any){
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Project not found' })
            }
            console.error('Error deleting project:', error)
            return res.status(500).json({ error: 'Failed to delete project' })
        }
    },
    updateProject: async (req: Request, res: Response) => {
        
        const parsedParams = idParamSchema.safeParse(req.params)

        if(!parsedParams.success){
            return res.status(400).json({error:z.treeifyError(parsedParams.error)})
        }


        const parsedBody = projectBodySchema.safeParse(req.body)

        if(!parsedBody.success){
            return res.status(400).json({error:z.treeifyError(parsedBody.error)})
        }

        try {
            const updatedProject = await projectServices.updateProject(parsedParams.data.id, parsedBody.data)
            return res.status(200).json(updatedProject)
        } catch (error:any) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Project not found' })
            }

            console.error('Error updating project:', error)
            return res.status(500).json({ error: 'Failed to update project' })
        }
    },
    getProjectById: async (req: Request, res: Response) => {

        
        const parsed = idParamSchema.safeParse(req.params)

        if(!parsed.success){
            return res.status(400).json({error:z.treeifyError(parsed.error)})
        }
   
        try {
            const project = await projectServices.getProjectById(parsed.data.id)
            if (!project) {
                return res.status(404).json({ error: 'Project not found' })
            }
            return res.status(200).json(project)
        } catch (error:any) {
            console.error('Error fetching project:', error)
            return res.status(500).json({ error: 'Failed to fetch project' })
        }
    }
}