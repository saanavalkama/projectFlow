import { Request, Response, NextFunction } from "express"
import { ForbiddenError } from "../errors/AppError.js"

type ProjectRole = NonNullable<Request["projectRole"]>

//must be used after requireProjectAccess or requireTaskAccess since they set projectRole field

export function requireRole(...roles: ProjectRole[]) {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (!req.projectRole || !roles.includes(req.projectRole)) {
            throw new ForbiddenError("Insufficient role")
        }
        next()
    }
}
