import 'express'

declare global{
    namespace Express{
        interface Request{
            projectRole? : "OWNER" | "ADMIN" | "MEMBER"
        }
    }
}

export {}