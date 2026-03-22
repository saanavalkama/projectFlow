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

    const {register, handleSubmit, reset} = useForm<EditProjectData>()
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const {mutate: updateProject, isPending, isError} = useMutation({
        mutationFn: (data: EditProjectData) => projectServices.updateProject(project.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', project.id] })
            reset()
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
                <div>
                    <label htmlFor="name">Edit Name</label>
                    <input type="text" id="name" {...register("name")} defaultValue={project.name} placeholder={project.name}/>
                </div>
                <div>
                    <label htmlFor="description">Edit Description</label>
                    <textarea id="description" {...register("description")} defaultValue={project.description} placeholder={project.description} />
                </div>
                <button
                     type="submit"
                    disabled={isPending}
                >
                    {isPending ? 'Updating...' : 'Update Project'}
                </button>
            </form>
        </div>
    )
}