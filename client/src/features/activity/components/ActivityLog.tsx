import type { ActivityLog } from "@/features/projects/types/types"
import { useActivity } from "../hooks/useActivity"
import { BounceLoader } from "react-spinners"
import { ActivityIcon } from "lucide-react"
import type { MetaData } from "@/features/projects/types/types"


const activityMessageFactory : Record<string, (meta:MetaData) => string> = {
    MEMBER_ADDED:(meta:MetaData)=>`${meta.addedMember} joined the project! (Added by ${meta.whoAdded})`,
    TASK_CREATED:(meta:MetaData) => `Task ${meta.taskName} added by ${meta.createdBy}`,
    TASK_STATUS_CHANGED: (meta:MetaData) =>`Task ${meta.taskName} marked as ${meta.status} by ${meta.changedBy}`,
    TASK_ASSIGNED:(meta:MetaData)=>`${meta.assignee} assigned to the task ${meta.taskName}`,
    TASK_UNASSIGNED:(meta:MetaData)=>`${meta.unassignee} unassigned from task ${meta.taskName}`,
    TASK_DUE_SOON:(meta:MetaData)=>`Task ${meta.taskName} due in one day`,
}

interface ActivityLogParams{
    projectId: string
}

export default function ActivityLogList({projectId}:ActivityLogParams){

    const{data:activityLog, isPending, error}  = useActivity(projectId)

    function messageBuilder(activity:ActivityLog){
        const builder = activityMessageFactory[activity.action]
        if(!builder) return 'unknown activity'
        return builder(activity.metadata as MetaData)
    }

    function formatTime(iso: string){
        return new Date(iso).toLocaleString(undefined, {
            month: "short", day: "numeric",
            hour: "2-digit", minute: "2-digit"
        })
    }

    if(isPending) return <BounceLoader />
    if(error){
        console.log(error)
        return <div>something went wrong</div>
    }

    return(
        <div className="flex flex-col h-full border border-zinc-600 rounded-md overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-600 shrink-0">
                <ActivityIcon className="h-4 w-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-200">Activity</span>
            </div>
            <ul className="flex flex-col gap-1 p-3 overflow-y-auto">
                {activityLog.map((a: ActivityLog) => (
                    <li key={a.id} className="flex flex-col gap-0.5 px-3 py-2 rounded-md bg-zinc-700/50 border border-zinc-600/50">
                        <span className="text-sm text-zinc-200">{messageBuilder(a)}</span>
                        <span className="text-xs text-zinc-500">{formatTime(a.createdAt)}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
