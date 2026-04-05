import type {TaskStatus} from "../types/types"
import { useUpdateTaskStatus } from "../hooks/useTaskMutations"
import { BounceLoader } from "react-spinners"

type TaskStatusPickerProps = {
    status: TaskStatus
    id: string
    projectId: string 
}

export default function TaskStatusPicker({status, id, projectId} :TaskStatusPickerProps){

   const {mutate: changeStatus, isPending, isError} = useUpdateTaskStatus()

    const handleUpdateStatus = (status:TaskStatus) => {
        changeStatus({projectId, id, status})
    }

    if(isError) return <div>something went wrong while updating the task status</div>
    if(isPending) return <BounceLoader />

    const statuses = [
      { value: "TODO", label: "To do", base: "bg-zinc-700 text-zinc-300 opacity-80 border border-transparent", active: "bg-zinc-500 text-zinc-100 border border-zinc-100" },
      { value: "IN_PROGRESS", label: "In progress", base: "bg-cyan-900 text-zinc-300 opacity-80 border border-transparent", active: "bg-cyan-700 text-amber-100 border border-zinc-100" },
      { value: "DONE", label: "Done", base: "bg-teal-900 text-teal-300 opacity-80 border border-transparent", active: "bg-teal-700 text-teal-100 border border-zinc-100" },
    ]

    return(
        <div>
            <h3>Check status</h3>
            <div>
                {statuses.map((s)=>(
                  <button
                    key={s.value}
                    disabled={status === s.value}
                    onClick={()=>handleUpdateStatus(s.value as TaskStatus)}
                    className={
                        `px-4 py-2 rounded-full text-sm font-medium transition-colors 
                        ${status === s.value ? s.active : s.base}
                        `}
                  >
                    {s.label}
                  </button>
                )        
                )}
            </div>
        </div>
    )    
}