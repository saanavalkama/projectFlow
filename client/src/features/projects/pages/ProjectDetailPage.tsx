import { useState } from "react"
import { useParams } from "react-router-dom"
import { useProject } from "../hooks/useProject"
import { BounceLoader } from "react-spinners"
import ProjectDetailBar from "../components/ProjectDetailBar"
import ProjectDetailCard from "../components/ProjectDetailCard"
import EditProjectForm from "../components/EditProjectForm"
import Tasks from "@/features/tasks/components/Tasks"
import { useMe } from "@/features/auth/hooks/useAuthQueries"
import MemberList from "@/features/members/components/MemberList"
import AddMemberForm from "@/features/members/components/AddMemberForm"
import ActivityLogList from "@/features/activity/components/ActivityLog"

export default function ProjectDetailPage(){

    const { projectId } = useParams()
    const {data:me} = useMe()
    const {data:project, isPending, isError} = useProject(projectId)
    const [isEditOpen, setIsEditOpen] = useState(false)

    if(!projectId) return <div>no project ID</div>
    if(isPending) return <BounceLoader />
    if(isError) return <div>something went wrong</div>
    if(!project) return <div>something went wrong</div>

    const isOwner = me?.id === project.ownerId

    return(
        <div className="flex w-full flex-col h-screen" >
          <div className="max-w-xl mx-auto w-full self-center">
            <ProjectDetailBar name={project.name} projectId={project.id} isOwner={isOwner} setIsEditOpen={setIsEditOpen} />
          </div>
          <div className="flex flex-1 gap-5 p-4 overflow-hidden w-full">
            <div className="w-1/2 h-full flex flex-col gap-5">
                {isEditOpen
                    ? <EditProjectForm project={project} setIsEditProjectOpen={setIsEditOpen} />
                    : <ProjectDetailCard project={project} />
                }
                <MemberList projectId={project.id} isOwner={isOwner} />
                {isOwner && <AddMemberForm projectId={projectId} />}
            </div>
            <div className="w-1/2 h-full flex flex-col gap-5">
                <div className="flex-2 overflow-hidden">
                    <Tasks projectId={projectId} />
                </div>
                <div className="flex-1 overflow-hidden">
                    <ActivityLogList projectId={projectId} />
                </div>
            </div>
          </div>
        </div>
    )
}
