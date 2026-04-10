import type { MemberResponse } from "../types/memberTypes"
import { Trash } from "lucide-react"
import { useMemberDeletion } from "../hooks/useMemberMutatations"


type Props = {
    member: MemberResponse
    projectId: string
    isOwner: boolean
}

export default function MemberItem({ member, projectId, isOwner }: Props) {
    const { mutate: deleteMember } = useMemberDeletion()

    const initials = member.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <li className="flex items-center gap-3 py-2">
            <div 
              className="flex items-center justify-center w-9 h-9 rounded-full text-white text-sm font-medium shrink-0">
                {initials}
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate">{member.user.name}</span>
                <span className="text-xs text-muted-foreground truncate">{member.user.email}</span>
            </div>
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">
                {member.role === "ADMIN" ? "Admin" : "Member"}
            </span>
            {isOwner && (
                <button
                    className="bg-red-600 rounded-full flex justify-center items-center p-1 shrink-0"
                    onClick={() => {
                        if(confirm(`Remove ${member.user.name} from project?`)) {
                            deleteMember({ projectId, userId: member.user.id })
                        }
                    }}
                >
                    <Trash size={14} />
                </button>
            )}
        </li>
    )
}
