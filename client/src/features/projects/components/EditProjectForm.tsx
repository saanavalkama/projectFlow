import type { Project } from "../types/types"
import {useForm} from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { projectServices } from "../services/projectServices"
import { useAppDispatch } from "../../../app/hooks"
import { closeEditProject } from "../../ui/uiSlice"


type EditProjectFormProps = {
    project: Project
}

type EditProjectData = {
    name: string
    description: string
}

export function EditProjectForm({ project }: EditProjectFormProps) {

    const {register, handleSubmit, formState: {errors}} = useForm<EditProjectData>({
        defaultValues: {
            name: project.name,
            description: project.description ?? ""
        }
    })

    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const {mutate: updateProject, isPending, isError} = useMutation({
        mutationFn: (data: EditProjectData) => projectServices.updateProject(project.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', project.id] })
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            dispatch(closeEditProject())
        }
    })

    const onSubmit = (data: EditProjectData) => {
        updateProject(data)
    }


    return (
        <div>
            <h2>Edit Project</h2>
            {isError && <div>Error occurred while updating project.</div>}
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
                onClick={() => dispatch(closeEditProject())}
            >
                Close
            </button>
        </div>
    )
}