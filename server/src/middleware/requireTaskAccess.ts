import { NextFunction, Request, Response } from "express";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "../errors/AppError.js";
import {prisma} from '../lib/prisma.js'

export  async function requireTaskAccess(req:Request, _res:Response, next: NextFunction){

    const userId = req.session.userId
    if(!userId) throw new UnauthorizedError("Not logged in")

    const project = await prisma.project.findUnique({
        where: {id: req.params.projectId as string},
        include:{members:true}
    })

    if(!project) throw new NotFoundError("Project")

    const isOwner = project.ownerId === userId
    const isMember = project.members.some(m => m.userId === userId)

    if(!isOwner && !isMember) throw new ForbiddenError("No access to this task")    
    req.projectRole = isOwner ? "OWNER" : project.members.find(m => m.userId === userId)!.role

    next()

}