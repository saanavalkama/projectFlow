import { useTask } from "../hooks/useTaskQueries"
import { useParams } from "react-router-dom"
import TaskDetailBar from "../components/TaskDetailBar"
import { BounceLoader } from "react-spinners"
import TaskDetailCard from "../components/TaskDetailCard"
import { Calendar } from '@/components/ui/calendar'
import { getDuedateInfo } from "../utils/getDueDateInfo"


export default function TaskDetailPage(){

    const {taskId,projectId} = useParams()

    const {data:task, isPending, isError} = useTask(projectId, taskId)

    if(!taskId || !projectId) return <div>something went wrong</div>
    if(isPending) return <BounceLoader />
    if(isError) return <div>Something went wrong while fetching task</div>
    
    const {text, className} = getDuedateInfo(task.dueDate)
    
    return(
        <div className="flex w-full flex-col h-screen">
            <div className="max-w-xl mx-auto w-full self-center">
              <TaskDetailBar name={task.title} />
            </div>
            <div className="flex flex-row w-full">
                <div className="w-1/2">
                    <TaskDetailCard
                      task={task} 
                      projectId={projectId}
                    />
                </div>
                <div className="w-1/2">
                  <p className={`text-sm font-medium mt-2 text ${className}`}>
                    {text}
                  </p>
                  <div className="scale-125 origin-top-left [&_[data-selected-single=true]]:bg-red-600 [&_[data-selected-single=true]]:text-white">
                    <Calendar 
                      classNames={{
                      }}
                      mode="single"
                      selected={task.dueDate ? new Date(task.dueDate) : undefined}
                      defaultMonth={task.dueDate ? new Date(task.dueDate) : new Date()}
                    />
                    </div>
                </div>
            </div>
        </div>

    )
}