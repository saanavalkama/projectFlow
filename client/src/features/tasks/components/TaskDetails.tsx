import TaskStatusPicker from "./TaskStatusPicker"
import TaskDetailCard from "./TaskDetailCard"
import { useNavigate } from "react-router-dom"
import { useTask } from "../hooks/useTaskQueries"
import { useDeleteTask } from "../hooks/useTaskMutations"
import type { DeleteTaskInput } from "../types/types"

type TaskDetailProps = {
    taskId: string | undefined
    projectId: string | undefined 
}

export default function TaskDetails({taskId,projectId}:TaskDetailProps){

    const navigate = useNavigate()


    const {data:task, isPending, isError} = useTask(taskId)

    const {mutate: deleteTask, isPending: isDeletePending, isError: isDeleteError} = useDeleteTask()

    function handleDelete(data:DeleteTaskInput){
        deleteTask(data,{
            onSuccess:()=>{
              navigate(`/workspace/${projectId}`)
            }
        })
    }

    if(!projectId) return <div>sommething went wrong</div>

    if(!taskId) return <div>click task to show details</div>

    if(isPending) return <div>Loading</div>

    if(isError) return <div>Error while fetching task</div>

    if(isDeleteError) return <div>Error while deleting task</div>

    return(
        <div className="task-detail">
            <TaskDetailCard task={task}/>
            <TaskStatusPicker 
              status={task.status}
              id={task.id}
              projectId={projectId}
            />
            <button
              onClick={()=>handleDelete({projectId, id: task.id})}
              disabled={isDeletePending}
            >{isDeletePending ? "Deleting..." : "Delete Task"}</button>
        </div>
    )
}