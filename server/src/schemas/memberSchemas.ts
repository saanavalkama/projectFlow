import { z } from "zod"

export const memberParamsSchema = z.object({
    projectId: z.string().uuid(),
    userId: z.string().uuid()
})

export const updateMemberRoleSchema = z.object({
    role: z.enum(["ADMIN", "MEMBER"])
})

export type UpdateMemberRole = z.infer<typeof updateMemberRoleSchema>

export const memberBodySchema = z.object({
    email:z.string().email().toLowerCase(),
    role: z.enum(["ADMIN", "MEMBER"]).optional().default("MEMBER")
})

export type MemberBody = z.infer<typeof memberBodySchema>
