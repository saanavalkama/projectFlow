import { z, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";


type ReqType = "body" | "params" | "query"

export function validate(schema:ZodSchema, type: ReqType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const parsed = schema.safeParse(req[type])

        if(!parsed.success){
            return res.status(400).json({error: z.treeifyError(parsed.error)})
        }

        if(type !== "query"){
            req[type] = parsed.data
        }
        next()
    }
} 