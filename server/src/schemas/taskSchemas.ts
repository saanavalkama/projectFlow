import {z} from "zod"

export const createTaskSchema = z.object({
    title: z.string().trim().min(1, "Task title is required"),
    details: z.string().trim().nullish().transform((val) => val == null ||val === "" ? undefined : val),
    dueDate: z.string().datetime().nullish()
})

export const updateTaskStatusSchema = z.object({
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"])
})

export const taskIdParamSchema = z.object({
    id: z.string().uuid()
})

export const projectTaskParamsSchema = z.object({
    projectId: z.string().uuid(),
    id: z.string().uuid()
})

export const projectIdParamSchema = z.object({
    projectId: z.string().uuid()
})

export const taskQuerySchema = z.object({
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).nullish().transform((val) => val == null ? undefined : val),
    search: z.string().trim().nullish().transform((val) => val == null || val === "" ? undefined : val)
})

export type NewTask = z.infer<typeof createTaskSchema>
export type UpdateTaskStatus = z.infer<typeof updateTaskStatusSchema>
export type TaskQuery = z.infer<typeof taskQuerySchema>