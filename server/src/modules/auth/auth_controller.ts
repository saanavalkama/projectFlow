import { LoginBody, UserRegisterBody } from "../../schemas/authSchemas.js"
import { Request, Response } from "express"
import { authService } from "./auth_service.js"

export const authController = {
    register: async(req: Request, res: Response) => {
        const data = req.body as UserRegisterBody
        await authService.register(data)
        return res.status(201).json({message: "registration succesfull"}) 
    },

    login: async(req:Request, res:Response)=>{
        const data = req.body as LoginBody
        const user = await authService.login(data)

        req.session.userId = user.id
        req.session.username = user.name
        
        res.status(200).json({message:'Login succesfull'})
    },

    logout: async(req:Request, res:Response) => {
        req.session.destroy((err)=>{
            if(err) return res.status(500).json({error: 'Logout failed'})
            res.clearCookie('connect.sid')
            res.status(200).json({message: 'Logged out'})
        })
    },

    me: async(req:Request, res:Response) => {
        const user = await authService.me(req.session.userId)
        res.status(200).json(user)
    }


}