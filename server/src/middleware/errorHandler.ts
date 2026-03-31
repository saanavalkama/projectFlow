import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message })
    }   

    if (typeof err === 'object' && err !== null && 'code' in err) {
       if(err.code === 'P2025') {
        return res.status(404).json({ error: 'Resource not found' })
       }
    }

    console.error('Unexpected error:', err)
    return res.status(500).json({ error: "Internal Server Error" })
}