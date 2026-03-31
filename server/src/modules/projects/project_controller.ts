import { ProjectBody } from "../../schemas/projectSchemas.js";
import { projectServices } from "./project_services.js";
import { Request, Response } from "express";


//NOTE: 
//1. All validation is done in the routes using the validate middleware, so we can assume that the data is valid in the controller and directly use it.
//2. The controller is only responsible for handling the request and response, and calling the appropriate service functions. All business logic is handled in the services.

export const projectController = {
    
    createProject: async (req: Request, res: Response) => {
        const data = req.body as ProjectBody
        const project = await projectServices.createProject (data)
        return res.status(201).json(project)  
    },

    getAllProjects: async (_req: Request, res: Response) => {
        const projects = await projectServices.getAllProjects()
        return res.status(200).json(projects)   
    },

    deleteProject: async (req: Request, res: Response) => {
        
        const {id} = req.params as {id: string}
        await projectServices.deleteProject(id)            
        return res.status(204).send()
        
    },

    updateProject: async (req: Request, res: Response) => {
        
        const {id} = req.params as {id: string}
        const data = req.body as ProjectBody
        const updatedProject = await projectServices.updateProject(id, data)
        return res.status(200).json(updatedProject)
      
    },
    getProjectById: async (req: Request, res: Response) => {

        const {id} = req.params as {id: string}
        const project = await projectServices.getProjectById(id)
        return res.status(200).json(project)
    }
}