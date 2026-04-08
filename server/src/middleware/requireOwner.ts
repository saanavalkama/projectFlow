import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "../errors/AppError.js";

export async function requireOwner(req: Request, _res: Response, next: NextFunction) {
    //already has checked auth but this is defense in depth
    const userId = req.session.userId
    if (!userId) throw new UnauthorizedError('not logged in')

    const { id } = req.params as {id:string}
    const project = await prisma.project.findUnique({ where: { id } })
    if (!project) throw new NotFoundError("Project")

    if (project.ownerId !== userId) throw new ForbiddenError("You do not own this project")

    next()
}
