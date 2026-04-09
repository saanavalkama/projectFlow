import { useParams } from "react-router-dom"
import { useProject } from "../hooks/useProject"
import { BounceLoader } from "react-spinners"
import ProjectDetailBar from "../components/ProjectDetailBar"
import ProjectDetailCard from "../components/ProjectDetailCard"
import Tasks from "@/features/tasks/components/Tasks"

export default function ProjectDetailPage(){

    const { projectId } = useParams()

    const {data:project, isPending, isError} = useProject(projectId)

    if(!projectId) return <div>no project ID</div>
    if(isPending) return <BounceLoader />
    if(isError) return <div>something went wrong</div>

    return(
        <div className="flex w-full flex-col h-screen" >
          <div className="max-w-xl mx-auto w-full self-center">
            <ProjectDetailBar name={project.name} ownerId={project.ownerId} />
          </div>
          <div className="flex flex-1 gap-5 p-4 overflow-hidden w-full">
            <div className="w-1/2 h-full">
                <ProjectDetailCard project={project} />
            </div>
            <div className="w-1/2 h-full">
                <Tasks projectId={projectId} />
            </div>
          </div>
        </div>
    )
}