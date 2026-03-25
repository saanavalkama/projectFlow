import { useQuery } from "@tanstack/react-query"
import { taskServices } from "../services/taskService"
import { NavLink } from "react-router-dom"


type TaskListProps = {
    projectId: string
}

export default function TaskList({ projectId }: TaskListProps) {

    
    const { data: tasks, isPending, error } = useQuery({
        queryKey: ['tasks', projectId],
        queryFn: () => taskServices.getTasksByProjectId(projectId)
    })

    if(isPending) return<div>Loading tasks...</div>
    if(error) return <div>Error occurred while fetching tasks: {error.message}</div>
    if(!tasks || tasks.length === 0) return <div>No tasks found for this project.</div>

    return (
        <div className="task-list">
            <h2>Task List</h2> 
            <ul>
                {tasks.map(task =>(
                <li key={task.id}>
                    <NavLink to={`/workspace/${projectId}/tasks/${task.id}`}>
                    {task.title}
                    </NavLink>
                </li>))}
            </ul>
        </div>
    )
}