import { useQuery } from "@tanstack/react-query"
import { taskServices } from "../services/taskService"

type TaskDetailProps = {
    taskId: string | undefined
}

export default function TaskDetails({taskId}:TaskDetailProps){

    const {data:task, isPending, isError} = useQuery({
        queryKey:['task',taskId],
        queryFn:()=>{
            if(!taskId) throw new Error("task id required to fetch task")
            return taskServices.getTaskById(taskId)
        },
        enabled: !!taskId

    })

    if(!taskId) return <div>click task to show details</div>

    if(isPending) return <div>Loading</div>

    if(isError) return <div>Error while fetching task</div>

    return(
        <div>
            <h2>{task.title}</h2>
            <h4>{task.details}</h4>
            <h4>{task.status}</h4>
        </div>
    )
}