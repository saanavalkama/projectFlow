import { useMutation, useQueryClient } from "@tanstack/react-query"
import { projectServices } from "../services/projectServices"
import { useNavigate } from "react-router-dom"

type ProjectDetailButtonGroupProps={
    setIsAddTaskOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsEditProjectOpen: React.Dispatch<React.SetStateAction<boolean>>
    projectId:string
}

export default function ProjectDetailButtonGroup({setIsAddTaskOpen, setIsEditProjectOpen, projectId}:ProjectDetailButtonGroupProps){

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: deleteProject, isPending: deletePending } = useMutation({
        mutationFn: (id:string) => {
            if(!id) throw new Error("Project ID is required")
            return projectServices.deleteProject(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            navigate("/workspace")
        }
    })

    function handleDelete(){
        const confirmed = window.confirm("Do you want to delete the project")
        if(!confirmed) return 
        deleteProject(projectId)
    }


    return(
        <div className="project-detail-button-group">
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