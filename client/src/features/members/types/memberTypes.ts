export interface MemberResponse{
    role: "ADMIN" | "MEMBER",
    user: {
        id:string,
        email:string,
        name:string
    }
}

export interface AddMemberData{
    email:string
    role: "ADMIN" | "MEMBER"
}

export interface Member{
  
}