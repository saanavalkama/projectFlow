export interface RegisterInput{
    name:string,
    email:string,
    rawPassword:string
}

export interface LoginInput{
    rawPassword: string,
    email: string
}

export interface BaseUser{
   id:string,
   name:string,
   email:string
}

export interface UserProfile extends BaseUser{
    createdAt: string
}