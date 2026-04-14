import type { Task, TaskWithAssignees } from "../types/types"
import TaskStatusPicker from "./TaskStatusPicker"
import { useAssingTask, useUnassignFromTask } from "../hooks/useTaskMutations"
import { Button } from "@/components/ui/button"
import type { UserProfile } from "@/features/auth/types/authTypes"

type TaskDetailCardProps = {
    task: TaskWithAssignees
    projectId: string
    userId:string
}

export default function TaskDetailCard({task, projectId, userId}:TaskDetailCardProps){
    const { mutate: assignToTask, isPending: isPendingAssign } = useAssingTask()
    const {mutate:unassign, isPending} = useUnassignFromTask()

    const assigned = task.taskAssignees.some(a => a.user.id === userId )

    const taskId = task.id

    const unassignData = {
      projectId,
      id: taskId,
      userId
    }

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
            {! assigned ? <Button
              onClick={() => assignToTask({ projectId, id: task.id })}
              disabled={isPendingAssign}
            >
              {isPendingAssign ? "Assigning..." : "Assign to me"}
            </Button> :
            <Button
              onClick={()=>unassign(unassignData)}
              disabled={isPending}
            >
              {isPending ? "Unassigning" : "Unassign from task"}
            </Button>}
        </div>
    )
}