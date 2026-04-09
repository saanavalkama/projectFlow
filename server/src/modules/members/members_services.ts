import { ForbiddenError, NotFoundError } from "../../errors/AppError.js"
import { MemberBody, UpdateMemberRole } from "../../schemas/memberSchemas.js"
import { userRepository } from "../auth/user_repository.js"
import { projectRepository } from "../projects/project_repository.js"
import { memberRepository } from "./members_repository.js"

export const memberServices = {
    getMembers: async (projectId: string) => {
        return await memberRepository.getMembers(projectId)
    },

    updateMemberRole: async (projectId: string, userId: string, data: UpdateMemberRole) => {
        //Owner cannot assign themselves
        const project = await projectRepository.getProjectById(projectId)
        if(!project) throw new NotFoundError("Project")
        if(project.ownerId === userId) throw new ForbiddenError("Owner cannot assign themselves")
        return await memberRepository.updateMemberRole(projectId, userId, data.role)
    },

    removeMember: async (projectId: string, userId: string) => {
        //basically edge case if owner tries to delete themselves
        const project = await projectRepository.getProjectById(projectId)
        if(!project) throw new NotFoundError("Project")
        if(project.ownerId === userId) throw new ForbiddenError("Cannot remove owner")
        return await memberRepository.removeMember(projectId, userId)
    },

    addMember: async (projectId: string, data: MemberBody) => {
        
        const user = await userRepository.findByEmail(data.email)
        if(!user) throw new NotFoundError("User")

        return await memberRepository.addMember(projectId, user.id, data.role )


    }
}
