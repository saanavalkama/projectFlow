import { useForm, Controller } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import type { NewTask } from "../types/types"
import { useCreateTask } from "../hooks/useTaskMutations"
import {Field, FieldLabel} from "@/components/ui/field"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import FormInput from "../../ui/FormInput"
import {format} from "date-fns"
import FormTextArea from "@/features/ui/FormTextArea"


type AddTaskFormProps = {
    projectId: string,
    setIsTaskFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}



export default function AddTaskForm({projectId, setIsTaskFormOpen}:AddTaskFormProps){

    const {register, handleSubmit, reset, control, formState: {errors}} = useForm<NewTask>()

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
        <div className="flex flex-col items-center">
            <div>
                {isError && <div>Error while creating the task</div>}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center"
            >
                <FormInput
                  label="title"
                  name="title"
                  registration={register("title", {required:"title is required"})}
                  errorMsg={errors.title?.message}
                
                />
                <FormTextArea
                  label="details"
                  name="details"
                  registration={register("details")}
                  errorMsg={errors.details?.message}
                />
                <Controller
                    control={control}
                    name="dueDate"
                    render={({ field }) => (
                      <Field className="mx-auto w-44">
                        <FieldLabel htmlFor="date-picker-simple">Due Date</FieldLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date-picker-simple"
                                    className="justify-start font-normal"
                                >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date)=>field.onChange(date? date.toISOString() : undefined)}
                                defaultMonth={new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </Field>
                    )}
                />
                <button 
                    disabled={isPending}
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-500 text-white font-bold rounded py-2 px-4 w-fit my-1"
                >
                    {isPending ? "Creating new task" : "Create new task"}
                </button>
            </form>
            <button
              disabled={isPending}
              onClick={()=>setIsTaskFormOpen(false)}
              className="bg-red-900 hover:bg-red-700 text-white font-bold rounded py-2 px-4 w-fit my-1"
            >
                Back to project view
            </button>
    
        </div>
    )
}