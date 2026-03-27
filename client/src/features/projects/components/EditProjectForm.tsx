import type { NewProject, Project } from "../types/types"
import {useForm} from "react-hook-form"
import { useEditProject } from "../hooks/useProjectMutations"

type EditProjectFormProps = {
    project: Project,
    setIsEditProjectOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditProjectForm({ project, setIsEditProjectOpen }: EditProjectFormProps) {

    const {register, handleSubmit, formState: {errors}, reset} = useForm<NewProject>({
        defaultValues: {
            name: project.name,
            description: project.description ?? ""
        }
    })

    const {mutate: updateProject, isPending, isError} = useEditProject()
    
    const onSubmit = (data: NewProject) => {
        updateProject({id: project.id, data},{
          onSuccess: () => {
            setIsEditProjectOpen(false)
            reset(data)
        }
        })
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