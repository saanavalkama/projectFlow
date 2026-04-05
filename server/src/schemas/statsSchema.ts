import {z} from "zod"

export const statsQuerySchema = z.object({
    projectId: z.string().uuid().nullish().transform((val) => val == null ? undefined : val)
})

