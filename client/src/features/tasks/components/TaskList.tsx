import { useQuery } from "@tanstack/react-query"
import { taskServices } from "../services/taskService"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import type { RootState } from "../../../app/store"
import { openAddTask } from "../../ui/uiSlice"
import AddTaskForm from "./AddTaskForm"

type TaskListProps = {
    projectId: string
}

export default function TaskList({ projectId }: TaskListProps) {

    const isAddTaskOpen = useAppSelector((state:RootState) => state.ui.isAddTaskOpen)
    const dispatch = useAppDispatch()

    const { data: tasks, isPending, isError } = useQuery({
        queryKey: ['tasks', projectId],
        queryFn: () => taskServices.getTasksByProjectId(projectId)
    })

    if(isPending) return <div>Loading tasks...</div>
    if(isError) return <div>Error occurred while fetching tasks</div>
    if(!tasks) return <div>no tasks</div>

    return (
        <div>
            {!isAddTaskOpen &&
            <>
                <h2>Task List</h2>
                {tasks.length !==0 ? 
                <ul>
                    {tasks.map(task => <li key={task.id}>{task.title}</li>)}
                </ul>
                : <div>No tasks yet</div>
                }
                <button onClick={()=>dispatch(openAddTask())}>Add task</button>
            </>
        
            } 
            {isAddTaskOpen && <AddTaskForm projectId={projectId} />}
        </div>
    )
}