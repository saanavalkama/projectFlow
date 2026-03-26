import { useQuery } from "@tanstack/react-query"
import { projectServices } from "../services/projectServices"
import { useState } from "react"
import ProjectDetailCard from "./ProjectDetailCard"
import TaskList from "../../tasks/components/TaskList"
import AddTaskForm from "../../tasks/components/AddTaskForm"
import EditProjectForm  from "./EditProjectForm"
import ProjectDetailButtonGroup from "./ProjectDetailButtonGroup"


type ProjectDetailProps = {
    projectId: string | undefined
}

export default function ProjectDetails({projectId}:ProjectDetailProps){

    const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false)
    const [isEditProjectOpen, setIsEditProjectOpen] = useState<boolean>(false)

    //fetch project 
    const { data: project, isPending, error } = useQuery({
        queryKey: ['project',projectId],
        queryFn: () => {
            if(!projectId) throw new Error("Project ID is required")
            return projectServices.getProjectById(projectId)
        },
        enabled: !!projectId
    })


    if(!projectId) return <div>Click project to see details</div>

    if(isPending) return <div>Loading...</div>

    if(error) return <div>{error.message}</div>

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






