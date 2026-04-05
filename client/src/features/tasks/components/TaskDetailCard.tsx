import type { Task } from "../types/types"
import TaskStatusPicker from "./TaskStatusPicker"

type TaskDetailCardProps = {
    task: Task
    projectId: string
}

export default function TaskDetailCard({task, projectId}:TaskDetailCardProps){
    return(
        <div>
            <h2>{task.title}</h2>
            <TaskStatusPicker 
              projectId={projectId}
              status={task.status}
              id={task.id}  
            />
            <h4>{task.details}</h4>
            <h4>{task.status}</h4>
            <h4>{task.dueDate ? `Due date: ${new Date(task.dueDate).toLocaleDateString()}` : "No due date"}</h4>
        </div>
    )
}