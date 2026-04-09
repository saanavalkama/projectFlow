import { Request, Response } from "express"
import { UnauthorizedError } from "../../errors/AppError.js"
import { MemberBody, UpdateMemberRole } from "../../schemas/memberSchemas.js"
import { memberServices } from "./members_services.js"

export const memberController = {
    getMembers: async (req: Request, res: Response) => {
        const { projectId } = req.params as { projectId: string }
        const members = await memberServices.getMembers(projectId)
        return res.status(200).json(members)
    },

    updateMemberRole: async (req: Request, res: Response) => {
        const { projectId, userId } = req.params as { projectId: string; userId: string }
        const data = req.body as UpdateMemberRole
        const member = await memberServices.updateMemberRole(projectId, userId, data)
        return res.status(200).json(member)
    },

    removeMember: async (req: Request, res: Response) => {
        const { projectId, userId } = req.params as { projectId: string; userId: string }
        await memberServices.removeMember(projectId, userId)
        return res.status(204).send()
    },

    addMember: async (req: Request, res: Response) => {
        const { projectId } = req.params as { projectId: string }
        const data = req.body as MemberBody
        const member = await memberServices.addMember(projectId, data)
        return res.status(201).json(member)
    }
}
