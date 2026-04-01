import { useForm, Controller } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import type { NewTask } from "../types/types"
import { useCreateTask } from "../hooks/useTaskMutations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";



type AddTaskFormProps = {
    projectId: string,
    setIsTaskFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}



export default function AddTaskForm({projectId, setIsTaskFormOpen}:AddTaskFormProps){

    const {register, handleSubmit, reset, control} = useForm<NewTask>()

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
                <div>
                <label htmlFor="dueDate">Due Date</label>
                <Controller
                    control={control}
                    name="dueDate"
                    render={({ field }) => (
                    <DatePicker
                        id="dueDate"
                        placeholderText="Select due date"
                        onChange={(date:Date | null) => field.onChange(date ? date.toISOString() : undefined)}
                        selected={field.value ? new Date(field.value) : null}
                        dateFormat="dd-MM-yyyy"
                    />
                    )}
                />
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