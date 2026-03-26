import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { taskServices } from "../services/taskService"
import TaskStatusPicker from "./TaskStatusPicker"
import TaskDetailCard from "./TaskDetailCard"
import { useNavigate } from "react-router-dom"

type TaskDetailProps = {
    taskId: string | undefined
    projectId: string | undefined 
}

export default function TaskDetails({taskId,projectId}:TaskDetailProps){

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {data:task, isPending, isError} = useQuery({
        queryKey:['task',taskId],
        queryFn:()=>{
            if(!taskId) throw new Error("task id required to fetch task")
            return taskServices.getTaskById(taskId)
        },
        enabled: !!taskId
    })

    const {mutate:deleteTask, isPending: isDeletePending, isError: isDeleteError} = useMutation({
        mutationFn:(id:string) => taskServices.deleteTask(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['tasks',projectId]})
            navigate(`/workspace/${projectId}`)
        }
    })


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
              onClick={()=>deleteTask(taskId)}
              disabled={isDeletePending}
            >{isDeletePending ? "Deleting..." : "Delete Task"}</button>
        </div>
    )
}