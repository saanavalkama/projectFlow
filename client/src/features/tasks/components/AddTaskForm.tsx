import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import type { NewTask } from "../types/types"
import { useCreateTask } from "../hooks/useTaskMutations"


type AddTaskFormProps = {
    projectId: string,
    setIsTaskFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}



export default function AddTaskForm({projectId, setIsTaskFormOpen}:AddTaskFormProps){

    const {register, handleSubmit, reset} = useForm<NewTask>()

    const {mutate:createTask, isPending, isError} = useCreateTask()

    const onSubmit: SubmitHandler<NewTask> = (data) => {
        createTask({projectId, data}, {
            onSuccess:()=>{
                setIsTaskFormOpen(false)
                reset()
            }
        })
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