import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { taskServices } from "../services/taskService"
import { useQueryClient } from "@tanstack/react-query"
import type { NewTask } from "../types/types"


type AddTaskFormProps = {
    projectId: string,
    setIsTaskFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type TaskFormInputs = {
    title: string,
    details: string
}

export default function AddTaskForm({projectId, setIsTaskFormOpen}:AddTaskFormProps){

    const {register, handleSubmit, reset} = useForm<TaskFormInputs>()
    const queryClient = useQueryClient()

    const {mutate: createTask, isPending, isError} = useMutation({
        mutationFn: (data:NewTask) => taskServices.createTask(data),
        onSuccess:()=> {
            queryClient.invalidateQueries({queryKey:["tasks",projectId]})
            reset()
        }
    })

    const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
        const payload = {
            ...data,
            projectId
        }
        createTask(payload)
    }
    
    return(
        <div className="add-task-form">
            <div>
                <h2>Add task</h2>
                {isError && <div>Error while creating the task</div>}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" {...register("title",{required:"The title is required"})} />
                </div>
                <div>
                    <label htmlFor="details">Details</label>
                    <textarea id="details" {...register("details")}/>
                </div>
                <button 
                    disabled={isPending}
                >
                    {isPending ? "Creating new task" : "Create new task"}
                </button>
            </form>
            <button
              disabled={isPending}
              onClick={()=>setIsTaskFormOpen(false)}
            >
                Back to project view
            </button>
        </div>
    )
}