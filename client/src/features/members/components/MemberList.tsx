import { BeatLoader } from "react-spinners"
import { useMembers } from "../hooks/useMembers"
import MemberItem from "./MemberItem"

type Props = {
    projectId: string
    isOwner: boolean
}

export default function MemberList({ projectId, isOwner }: Props) {
    const { data: members, isPending, error } = useMembers(projectId)

    if (isPending) return <BeatLoader />
    if (error) return <div>Error loading members: {error.message}</div>

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Members
                </h2>
                <span className="text-xs text-muted-foreground">{members.length}</span>
            </div>
            {members.length === 0 ? (
                <p className="text-sm text-muted-foreground">No members yet.</p>
            ) : (
                <ul className="divide-y divide-border">
                    {members.map((member) => (
                        <MemberItem key={member.user.id} member={member} projectId={projectId} isOwner={isOwner} />
                    ))}
                </ul>
            )}
        </div>
    )
}
