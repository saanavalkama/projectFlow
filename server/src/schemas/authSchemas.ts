import z from "zod"

export const UserRegisterBodySchema = z.object({
  name: z
    .string()
    .min(3, "username must be at least 3 characters long")
    .max(50, "Name too long"),
  email: z.string().email("Invalid email address").toLowerCase(),
  rawPassword: z
    .string()
    .min(7,"Password must be at least 7 characters long")
    .max(100, 'password too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')

})

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address").toLowerCase(),
    rawPassword: z.string().min(1,'Password required')
})

export type UserRegisterBody = z.infer<typeof UserRegisterBodySchema>
export type LoginBody = z.infer<typeof LoginSchema>