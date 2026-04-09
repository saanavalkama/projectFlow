import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "../errors/AppError.js";

export async function requireProjectAccess(req: Request, _res: Response, next: NextFunction) {
    const userId = req.session.userId
    if (!userId) throw new UnauthorizedError('not logged in')

    const project = await prisma.project.findUnique({
        where:{
            id: req.params.id as string
        },
        include:{
            members:true
        }
    })

    if(!project) throw new NotFoundError("Project")
    
    const isOwner = project.ownerId === userId
    const isMember = project.members.some(m => m.userId === userId)

    if(!isOwner && !isMember) throw new ForbiddenError("No access to this porject")

    req.projectRole = isOwner ? "OWNER" : project.members.find(m => m.userId === userId)!.role

    next()
}
