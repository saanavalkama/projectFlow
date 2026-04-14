import { useState } from "react"
import { Users } from "lucide-react"
import type { TaskAssignee } from "../types/types"

type Props = {
    assignees: TaskAssignee[]
}

export default function TaskAssigneeCard({ assignees }: Props) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="border rounded-md overflow-hidden">
            <button
                onClick={() => setExpanded(prev => !prev)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Users size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium">Assignees</span>
                </div>
                <span className="text-xs text-muted-foreground">
                    {assignees.length === 0
                        ? "No one assigned"
                        : `${assignees.length} working on this`}
                </span>
            </button>

            {expanded && (
                <div className="px-4 pb-3">
                    {assignees.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-2">No assignees yet.</p>
                    ) : (
                        <ul className="divide-y divide-border">
                            {assignees.map((assignee) => {
                                const initials = assignee.user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()
                                    .slice(0, 2)

                                return (
                                    <li key={assignee.id} className="flex items-center gap-3 py-2">
                                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground text-sm font-medium shrink-0">
                                            {initials}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-medium truncate">{assignee.user.name}</span>
                                            <span className="text-xs text-muted-foreground truncate">{assignee.user.email}</span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}
