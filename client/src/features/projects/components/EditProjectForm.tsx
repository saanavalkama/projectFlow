import type { NewProject, Project } from "../types/types"
import { useForm } from "react-hook-form"
import { useEditProject } from "../hooks/useProjectMutations"
import FormInput from "@/features/ui/FormInput"
import FormTextArea from "@/features/ui/FormTextArea"

type EditProjectFormProps = {
    project: Project,
    setIsEditProjectOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditProjectForm({ project, setIsEditProjectOpen }: EditProjectFormProps) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<NewProject>({
        defaultValues: {
            name: project.name,
            description: project.description ?? ""
        }
    })

    const { mutate: updateProject, isPending, isError } = useEditProject()

    const onSubmit = (data: NewProject) => {
        updateProject({ id: project.id, data }, {
            onSuccess: () => {
                setIsEditProjectOpen(false)
                reset()
            }
        })
    }

    return (
        <div className="flex flex-col items-center">
            <h2>Edit Project</h2>
            {isError && <div>Error occurred while updating project.</div>}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
                <FormInput
                    label="Name"
                    name="name"
                    registration={register("name", { required: "Project name is required" })}
                    errorMsg={errors.name?.message}
                />
                <FormTextArea
                    label="Description"
                    name="description"
                    registration={register("description")}
                    errorMsg={errors.description?.message}
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-teal-600 hover:bg-teal-500 text-white font-bold rounded py-2 px-4 w-fit my-1"
                >
                    {isPending ? "Updating..." : "Update Project"}
                </button>
            </form>
            <button
                disabled={isPending}
                className="bg-red-900 hover:bg-red-700 text-white font-bold rounded py-2 px-4 w-fit my-1"
                onClick={() => setIsEditProjectOpen(false)}
            >Close Form</button>
        </div>
    )
}
