import { BeatLoader } from "react-spinners"
import { useTasks } from "../hooks/useTaskQueries"
import { useTaskFilter } from "../hooks/useTaskStatusFilter"
import { NavLink } from "react-router-dom"



type TaskListProps = {
    projectId: string
}

export default function TaskList({ projectId }: TaskListProps) {


    const {status, search} = useTaskFilter()
    const {data: tasks, isPending, error} = useTasks(projectId, status, search)
  

    if(isPending) return<BeatLoader />
    if(error) return <div>Error occurred while fetching tasks: {error.message}</div>

    return (
        <div className="task-list">
            <h4>Task List</h4> 
            {tasks.length === 0 ?  <div>No tasks found</div> :
            <ul>
                {tasks.map(task =>(
                <li key={task.id}>
                    <NavLink to={`/workspace/${projectId}/tasks/${task.id}`}>
                    {task.title} {task.status}
                    </NavLink>
                </li>))}
            </ul>}
        </div>
    )
}