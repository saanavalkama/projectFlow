import {useForm} from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { projectServices } from '../services/projectServices'
import type { NewProject } from '../types/types'

type ProjectFormProps = {
    setIsProjectFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProjectForm({setIsProjectFormOpen}:ProjectFormProps){

    const queryClient = useQueryClient()
    
    const { mutate, isPending, isError } = useMutation({
        mutationFn: (data: NewProject) => projectServices.createProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            reset()
            setIsProjectFormOpen(false)
        }
    })


    const { register, handleSubmit, reset } = useForm<NewProject>();

    const onSubmit: SubmitHandler<NewProject> = data => {
        mutate(data)
    }

    return (
        <div>
            <h2>New Project</h2> 
            {isError && <div>Error occurred while creating project.</div>} 
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" {...register("name", { required: true })} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" {...register("description")} />
                </div>
                <button type="submit" disabled={isPending}>
                    {isPending ? 'Creating...' : 'Create Project'}
                </button>
            </form>

        </div>
    )
}   