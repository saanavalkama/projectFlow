import TaskList from "./TaskList";
import TaskSearchBar from "./TaskSearchBar";
import TaskStatusFilter from "./TaskStatusFilter";

export default function Tasks({ projectId }: { projectId: string }) {

    return(
        <div>
            <h3>Tasks</h3>
            <TaskStatusFilter />
            <TaskSearchBar />
            <TaskList projectId={projectId} />
        </div>
    )
} 
