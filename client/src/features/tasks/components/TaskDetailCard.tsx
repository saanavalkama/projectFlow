import type { Task } from "../types/types"

type TaskDetailCardProps = {
    task: Task
}

export default function TaskDetailCard({task}:TaskDetailCardProps){
    return(
        <div>
            <h2>{task.title}</h2>
            <h4>{task.details}</h4>
            <h4>{task.status}</h4>
            <h4>{task.dueDate ? `Due date: ${new Date(task.dueDate).toLocaleDateString()}` : "No due date"}</h4>
        </div>
    )
}