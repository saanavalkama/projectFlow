import type {TaskStatus} from "../types/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskServices } from "../services/taskService"
import type { UpdateTaskStatusInput } from "../types/types"
import TaskStatusButton from "./TaskStatusButton"

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

    const handleUpdateStatus = (status:TaskStatus) => {
        updateStatus({id, status})
    }

    if(isError) return <div>something went wrong while updating the task status</div>

    const statuses : {value: TaskStatus, label: string}[] = [
        {value: "TODO", label: "To do"},
        {value: "IN_PROGRESS", label: "In progress"},
        {value: "DONE", label:"Done"}
    ]

    
    return(
        <div>
            <h3>Check status</h3>
            <div className="task-status-group">
                {statuses.map(({value,label})=>
                <TaskStatusButton
                  key={value}
                  status={value}
                  currentStatus={status}
                  isPending={isPending}
                  onClick={()=>handleUpdateStatus(value)}
                  label={label}
                />
                )}
            </div>
        </div>
    )    
}