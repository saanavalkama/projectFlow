import ProjectDetails from "../features/projects/components/ProjectDetails";
import ProjectSidebar from "../features/projects/components/ProjectSidebar";
import TaskDetails from "../features/tasks/components/TaskDetails";
import { useParams } from "react-router-dom";

export default function Workspace(){

    const {projectId, taskId} = useParams()

    return(
        <div className="workspace">
            <ProjectSidebar/>
            <ProjectDetails projectId={projectId} />
            <TaskDetails taskId={taskId} projectId={projectId} />
        </div>
    )
}