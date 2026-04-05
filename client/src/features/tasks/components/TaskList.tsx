import { BeatLoader } from "react-spinners"
import { useTasks } from "../hooks/useTaskQueries"
import { useTaskFilter } from "../hooks/useTaskStatusFilter"
import TaskCard from "./TaskCard"
import { Link } from "react-router-dom"



type TaskListProps = {
    projectId: string
}

export default function TaskList({ projectId }: TaskListProps) {


    const {status, search} = useTaskFilter()
    const {data: tasks, isPending, error} = useTasks(projectId, status, search)
  

    if(isPending) return<BeatLoader />
    if(error) return <div>Error occurred while fetching tasks: {error.message}</div>
    if(tasks.length === 0 ) return <div>No tasks</div>

    return (
       <ul className="flex overflow-y-auto flex-col flex-1 h-2/3">
          {tasks.map(task =>
            <Link to={`tasks/${task.id}`}>
              <li>
                <TaskCard task={task} />
              </li>
            </Link>
          )}
            
      </ul>
    )
}