import type {TaskStatus} from "../types/types"
import TaskStatusButton from "./TaskStatusButton"
import { useUpdateTaskStatus } from "../hooks/useTaskMutations"

type TaskStatusPickerProps = {
    status: TaskStatus
    id: string
    projectId: string 
}

export default function TaskStatusPicker({status, id, projectId} :TaskStatusPickerProps){

   const {mutate: changeStatus, isPending, isError} = useUpdateTaskStatus()

    const handleUpdateStatus = (status:TaskStatus) => {
        changeStatus({projectId, id, status})
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