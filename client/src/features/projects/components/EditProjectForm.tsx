import type { Project } from "../types/types"
import {useForm} from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { projectServices } from "../services/projectServices"



type EditProjectFormProps = {
    project: Project,
    setIsEditProjectOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type EditProjectData = {
    name: string
    description: string
}

export default function EditProjectForm({ project, setIsEditProjectOpen }: EditProjectFormProps) {

    const {register, handleSubmit, formState: {errors}} = useForm<EditProjectData>({
        defaultValues: {
            name: project.name,
            description: project.description ?? ""
        }
    })

    const queryClient = useQueryClient()
    

    const {mutate: updateProject, isPending, isError} = useMutation({
        mutationFn: (data: EditProjectData) => projectServices.updateProject(project.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', project.id] })
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            setIsEditProjectOpen(false)
            
        }
    })

    const onSubmit = (data: EditProjectData) => {
        updateProject(data)
    }


    return (
        <div className="add-task-form">
            <div>
                <h2>Edit Project</h2>
                {isError && <div>Error occurred while updating project.</div>}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {errors.name && <div>{errors.name.message}</div>}
                <div>
                    <label htmlFor="name">Edit Name</label>
                    <input type="text" id="name" {...register("name", { required: "Project name is required" })} />
                </div>
                <div>
                    <label htmlFor="description">Edit Description</label>
                    <textarea id="description" {...register("description")}/>
                </div>
                <button
                     type="submit"
                    disabled={isPending}
                >
                    {isPending ? 'Updating...' : 'Update Project'}
                </button>
            </form>
            <button 
                onClick={() => setIsEditProjectOpen(false)}
            >
                Close
            </button>
        </div>
    )
}