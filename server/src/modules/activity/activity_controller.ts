import { Request, Response } from "express"
import { activityRepository } from "./activity_repository.js"

export const activityController = {
    
    getActivity: async(req:Request, res:Response) => {
        const {projectId} = req.params as {projectId:string}
        const activityLog = await activityRepository.getLogsByProjectId(projectId)
        res.status(200).json(activityLog)
    }
}