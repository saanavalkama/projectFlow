import { statsService } from "./stats_service.js"
import { Request, Response } from "express"

export const statsController = {

    getCards: async (req : Request, res: Response) => {
        const {projectId} = req.query as {projectId?: string}
        const cards = await statsService.getCards(projectId)
        res.json(cards)
    },

    getStatusDistribution: async (req: Request, res: Response) => {
        const {projectId} = req.query as {projectId?: string}
        const distribution = await statsService.getStatusDistribution(projectId)
        res.json(distribution)
    },

    getTasksPerProject: async (req: Request, res: Response) => {
        const tasksPerProject = await statsService.getTasksPerProject()
        res.json(tasksPerProject)
    },

    getTasksOverTime: async (req: Request, res: Response) => {
        const {projectId} = req.query as {projectId?: string}
        const data = await statsService.getTasksOverTime(projectId)
        res.json(data)
    }

}