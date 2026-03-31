import { useState } from "react"
import ProjectDetailCard from "./ProjectDetailCard"
import AddTaskForm from "../../tasks/components/AddTaskForm"
import EditProjectForm  from "./EditProjectForm"
import ProjectDetailButtonGroup from "./ProjectDetailButtonGroup"
import { useProject } from "../hooks/useProject"
import Tasks from "../../tasks/components/Tasks"
import { BounceLoader } from "react-spinners"


type ProjectDetailProps = {
    projectId: string | undefined
}

export default function ProjectDetails({projectId}:ProjectDetailProps){

    const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false)
    const [isEditProjectOpen, setIsEditProjectOpen] = useState<boolean>(false)

    const {data: project, isPending, isError} = useProject(projectId)

    if(!projectId) return <div>Click project to see details</div>

    if(isPending) return <BounceLoader />

    if(isError) return <div>Error fetching the project</div>

    if(isAddTaskOpen) return <AddTaskForm projectId={projectId} setIsTaskFormOpen={setIsAddTaskOpen}/>

    if(isEditProjectOpen) return <EditProjectForm project={project} setIsEditProjectOpen={setIsEditProjectOpen}/>

    return(
        <div className="project-detail">
            <ProjectDetailCard project={project}/>
            <Tasks projectId={projectId}/>
            <ProjectDetailButtonGroup 
                setIsAddTaskOpen={setIsAddTaskOpen}
                setIsEditProjectOpen={setIsEditProjectOpen}
                projectId={projectId}
            />
        </div>
    )
}






