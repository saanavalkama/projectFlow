import { ConflictError } from "../../errors/AppError.js"
import { prisma } from "../../lib/prisma.js"
import { MemberBody } from "../../schemas/memberSchemas.js"
import { MemberRole } from "../../generated/prisma/enums.js"

const memberSelect = {
    role:true,
    user: {
        select: {id:true, name:true, email:true}
    }
}

export const memberRepository = {
    getMembers: async (projectId: string) => {
        return await prisma.projectMember.findMany({
            where: { projectId},
            select: memberSelect
        })
    },

    updateMemberRole: async (projectId: string, userId: string, role: MemberRole) => {
        return await prisma.projectMember.update({
            where: { userId_projectId: { userId, projectId } },
            data: { role }
        })
    },

    removeMember: async (projectId: string, userId: string) => {
        return await prisma.projectMember.delete({
            where: { userId_projectId: { userId, projectId } }
        })
    },

    addMember: async (projectId: string, userId: string, role: MemberRole) => {
        try {
            return await prisma.projectMember.create({
                data: {
                    projectId,
                    userId,
                    role
                },
                select: memberSelect
            })
        } catch (e:unknown) {
            if (e instanceof Error && 'code' in e && e.code === "P2002") {
                throw new ConflictError("User is already a member of this project")
            }
            throw e
        }
    }
}
