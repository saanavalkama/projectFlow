import {useForm} from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { projectServices } from '../services/projectServices'
import { useAppDispatch } from '../../../app/hooks'
import { closeAddProject } from '../../ui/uiSlice'
import type { NewProject } from '../types/types'

export default function ProjectForm(){

    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const { mutate, isPending, isError } = useMutation({
        mutationFn: (data: NewProject) => projectServices.createProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
    })


    const { register, handleSubmit, reset } = useForm<NewProject>();

    const onSubmit: SubmitHandler<NewProject> = data => {
        mutate(data, {
            onSuccess: () => {       
                reset()     
                dispatch(closeAddProject())    
           }
        })
    }

    return (
        <div>
            <h2>New Project</h2> 
            {isError && <div>Error occurred while creating project.</div>} 
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" {...register("name")} />
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