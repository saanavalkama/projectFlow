import {z} from "zod"

export const projectBodySchema = z.object({
    name: z.string().trim().min(1, "Project name is required"),
    description: z.string().trim().nullish().transform((val) => val == null || val === "" ? undefined : val),  
})


export const idParamSchema = z.object({
    id: z.string().uuid()
})

export const projectQuerySchema = z.object({
    query: z.enum(["ALL","OWN", "MEMBER"]).nullish().transform(val => val === null ? undefined:val)
})

export type ProjectBody = z.infer<typeof projectBodySchema>
export type ProjectQuery = z.infer<typeof projectQuerySchema>
