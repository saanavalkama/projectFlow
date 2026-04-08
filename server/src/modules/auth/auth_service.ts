import { compare } from "bcrypt";
import { ConflictError, NotFoundError, UnauthorizedError } from "../../errors/AppError.js";
import { LoginBody, UserRegisterBody } from "../../schemas/authSchemas.js";
import { hashPassword } from "../../utils/password.js";
import { userRepository } from "./user_repository.js";

export const authService = {
    register: async(data: UserRegisterBody)=>{

        const existing = await userRepository.findByEmail(data.email)
        if(existing) throw new ConflictError('Email already in use')

        const hashedPassword = await hashPassword(data.rawPassword)

        return await userRepository.create({email: data.email, name: data.name, passwordHash: hashedPassword})
    },

    login: async(data:LoginBody) => {
         const user = await userRepository.findByEmailWithPassword(data.email)
         if(!user) throw new UnauthorizedError('Invalid credentials')

        const valid = await compare(data.rawPassword, user.passwordHash)
        if(!valid) throw new UnauthorizedError("Invalid credentials")

        return user

    },

    me: async(id: string | undefined) => {
        if(!id) throw new UnauthorizedError('Not logged in')
        const user = await userRepository.findById(id)
        if(!user) throw new NotFoundError("User not found")
        return user
    }

}