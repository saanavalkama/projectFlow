import { useNavigate,Link } from "react-router-dom"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { projectServices } from "../services/projectServices"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import type { RootState } from "../../../app/store"
import { openEditProject } from "../../ui/uiSlice"
import { EditProjectForm } from "./EditProjectForm"
import TaskList from "../../tasks/components/TaskList"

type ProjectDetailProps = {
    projectId: string | undefined
}

export default function ProjectDetails({projectId}:ProjectDetailProps){

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isEditProjectOpen = useAppSelector((state: RootState) => state.ui.isEditProjectOpen)

    //fetch project 
    const { data: project, isPending, error } = useQuery({
        queryKey: ['project',projectId],
        queryFn: () => {
            if(!projectId) throw new Error("Project ID is required")
            return projectServices.getProjectById(projectId)
        },
        enabled: !!projectId
    })

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

    

    
    if(isPending) return <div>Loading...</div>

    if(error) return <div>{error.message}</div>

    if(!projectId) return <div>Click project to see details</div>

    if(!project) return <div>Project not found</div>

    const handleDeleteProject = () => {
        const confirmed = window.confirm(`Delete project "${project.name}"?`)
        if (!confirmed) return
        deleteProject(project.id)
    }


    return(
        <div>
            {!isEditProjectOpen && (<>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <button
                    onClick={()=>dispatch(openEditProject())}
                >
                    Edit Project
                </button>
                <button
                    disabled={deletePending}
                    onClick={handleDeleteProject}
                >
                    {deletePending ? "Deleting..." : "Delete Project"}
                </button>
                <TaskList projectId={project.id} />
            </>)}
            {isEditProjectOpen && <EditProjectForm project={project} />}
        </div>
    )
}