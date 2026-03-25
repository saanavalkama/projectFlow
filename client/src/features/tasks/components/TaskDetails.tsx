import { useQuery } from "@tanstack/react-query"
import { taskServices } from "../services/taskService"
import TaskStatusPicker from "./TaskStatusPicker"
import TaskDetailCard from "./TaskDetailCard"

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
            <TaskDetailCard task={task}/>
            <TaskStatusPicker status={task.status}/>
        </div>
    )
}