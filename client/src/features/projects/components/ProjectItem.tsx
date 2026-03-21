import type { Project } from "../types/types"
import { projectServices } from "../services/projectServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type ProjectItemProps = {
    project: Project
}

export default function ProjectItem({ project }: ProjectItemProps) {

    const queryClient = useQueryClient()

        const { mutate, isPending, isError } = useMutation({
            mutationFn: (id: string) => projectServices.deleteProject(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['projects'] })
            }
        })

    return (
        <div>
            {isError && <div>Error occurred while deleting project.</div>}
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <button 
                onClick={() => mutate(project.id)}
                disabled={isPending}
            >
                {isPending ? 'Deleting...' : 'Delete Project'}    
            </button>
        </div>
    )
}