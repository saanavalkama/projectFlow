import { useNavigate } from "react-router-dom"
import { useDeleteProject } from "../hooks/useProjectMutations"

type ProjectDetailButtonGroupProps={
    setIsAddTaskOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsEditProjectOpen: React.Dispatch<React.SetStateAction<boolean>>
    projectId:string
}

export default function ProjectDetailButtonGroup({setIsAddTaskOpen, setIsEditProjectOpen, projectId}:ProjectDetailButtonGroupProps){

    const navigate = useNavigate()
    
    const {mutate: deleteProject, isPending: deletePending, isError} = useDeleteProject()

    function handleDelete(){
        const confirmed = window.confirm("Do you want to delete the project")
        if(!confirmed) return 
        deleteProject(projectId, {
            onSuccess:()=>{
                navigate("/workspace")
            }
        })
    }

    return(
        <div className="project-detail-button-group">
            {isError && <div>Error while deleting project</div>}
            <button onClick={()=>setIsAddTaskOpen(true)}>Add Task</button>
            <button onClick={()=>setIsEditProjectOpen(true)}>Edit Project</button>
            <button
                disabled={deletePending}
                onClick={handleDelete}
            >
              {deletePending ? 'Deleting...' : 'Delete Project'}
            </button>
        </div>
    )
}