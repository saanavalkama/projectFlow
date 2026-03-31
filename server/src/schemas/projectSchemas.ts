import {z} from "zod"

export const projectBodySchema = z.object({
    name: z.string().trim().min(1, "Project name is required"),
    description: z.string().trim().nullish().transform((val) => val == null || val === "" ? undefined : val),  
})


export const idParamSchema = z.object({
    id: z.string().uuid()
})

export type ProjectBody = z.infer<typeof projectBodySchema>
