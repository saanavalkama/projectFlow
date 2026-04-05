import {useForm} from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import type { NewProject } from '../types/types'
import { useCreateProject } from '../hooks/useProjectMutations'
import FormInput from '@/features/ui/FormInput'
import FormTextArea from '@/features/ui/FormTextArea'

type ProjectFormProps = {
    setAddFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProjectForm({setAddFormOpen}:ProjectFormProps){
    
   const {mutate: createProject, isPending, isError} = useCreateProject()

    const { register, handleSubmit, reset, formState:{errors} } = useForm<NewProject>();

    const onSubmit: SubmitHandler<NewProject> = data => {
        createProject(data, {
            onSuccess:()=>{
                reset()
                setAddFormOpen(false)
                
            }
        }) 
    }

    return (
        <div className='flex flex-col items-center'>
            <h2>New Project</h2> 
            {isError && <div>Error occurred while creating project.</div>} 
            <form 
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col items-center'
            >
                <FormInput
                  label='name'
                  name="name"
                  registration={register("name", {required: "Name is required"})}
                  errorMsg={errors.name?.message}
                />
                <FormTextArea
                  label="description"
                  name="description"
                  registration={register("description")}
                  errorMsg={errors.description?.message}
                />
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-teal-600 hover:bg-teal-500 text-white font-bold rounded py-2 px-4 w-fit my-1"
                  
                >
                    {isPending ? 'Creating...' : 'Create Project'}
                </button>
            </form>
            <button
                    disabled={isPending}
                    className='bg-red-900 hover:bg-red-700 text-white font-bold rounded py-2 px-4 w-fit my-1'
                    onClick={()=>setAddFormOpen(false)}
                >Close Form</button>
        </div>
    )
}   