import { prisma } from "../../lib/prisma.js"
import { User } from "../../generated/prisma/client.js"

export const  userRepository = {
    create: async(data: {email:string, name:string, passwordHash: string}) => {
        return prisma.user.create({
            data
        })
    },

    findByEmail: async(email:string)=>{
        return prisma.user.findUnique({
            where: {email},
            omit:{passwordHash:true}
        })
    },

    findByEmailWithPassword: async(email:string) => {
        return prisma.user.findUnique({
            where: {email}
        })
    },

    findById: async(id:string) => {
        return prisma.user.findUnique({
            where: {id} ,
            select: {
                id:true,
                name:true,
                email:true,
                createdAt:true
            }
        })
    }
}