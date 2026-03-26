import type {TaskStatus} from "../types/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskServices } from "../services/taskService"
import type { UpdateTaskStatusInput } from "../types/types"

type TaskStatusPickerProps = {
    status: TaskStatus
    id: string
    projectId: string | undefined
}

export default function TaskStatusPicker({status, id, projectId} :TaskStatusPickerProps){

    const queryClient = useQueryClient()

    const {mutate: updateStatus, isPending, isError} = useMutation({
        mutationFn:(data: UpdateTaskStatusInput) => taskServices.updateTaskStatus(data),
        onSuccess:()=> {
            queryClient.invalidateQueries({queryKey:['task',id]})
            queryClient.invalidateQueries({queryKey:['tasks', projectId]})
        }
    })

    
    return(
        <div>
            <h3>Check status</h3>
            <div className="task-status-group">
                <button 
                  className={`todo-button ${status === "TODO" ? "todo-button--active" : ""}`}
                  onClick={()=>updateStatus({id, status: "TODO"})}
                  disabled={status === "TODO"}
                >
                  To do
                </button>
                <button
                  className={`inprogress-button ${status === "IN_PROGRESS" ? "inprogress-button--active" : ""}`}
                  onClick={()=>updateStatus({id, status: "IN_PROGRESS"})}
                  disabled={status === "IN_PROGRESS"}
                >
                  In progress
                </button>
                <button
                  className={`done-button ${status === "DONE" ? "done-button--active" : ""}`}
                  onClick={()=>updateStatus({id, status:"DONE"})}
                  disabled={status === "DONE"}
                >Done</button>
            </div>
        </div>
    )    
}