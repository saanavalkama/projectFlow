import { useState } from "react"
import ProjectDetailCard from "./ProjectDetailCard"
import TaskList from "../../tasks/components/TaskList"
import AddTaskForm from "../../tasks/components/AddTaskForm"
import EditProjectForm  from "./EditProjectForm"
import ProjectDetailButtonGroup from "./ProjectDetailButtonGroup"
import { useProject } from "../hooks/useProject"


type ProjectDetailProps = {
    projectId: string | undefined
}

export default function ProjectDetails({projectId}:ProjectDetailProps){

    const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false)
    const [isEditProjectOpen, setIsEditProjectOpen] = useState<boolean>(false)

    const {data: project, isPending, isError} = useProject(projectId)

    if(!projectId) return <div>Click project to see details</div>

    if(isPending) return <div>Loading...</div>

    if(isError) return <div>Error fetching the project</div>

    if(!project) return <div>Project not found</div>

    if(isAddTaskOpen) return <AddTaskForm projectId={projectId} setIsTaskFormOpen={setIsAddTaskOpen}/>

    if(isEditProjectOpen) return <EditProjectForm project={project} setIsEditProjectOpen={setIsEditProjectOpen}/>

    return(
        <div className="project-detail">
            <ProjectDetailCard project={project}/>
            <TaskList projectId={projectId}/>
            <ProjectDetailButtonGroup 
                setIsAddTaskOpen={setIsAddTaskOpen}
                setIsEditProjectOpen={setIsEditProjectOpen}
                projectId={projectId}
            />
        </div>
    )
}






