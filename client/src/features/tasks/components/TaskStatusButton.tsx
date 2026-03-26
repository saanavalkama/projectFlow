import type { TaskStatus } from "../types/types"

type TaskStatusButtonProps = {
    status: TaskStatus,
    currentStatus: TaskStatus,
    isPending: boolean,
    onClick: () => void,
    label:string
}

export default function TaskStatusButton({status, currentStatus, isPending, onClick, label}:TaskStatusButtonProps){

    const name = status.toLowerCase() 
    console.log(name)

    return(
        <button
            className={`${name}-button ${currentStatus === status ? `${name}-button--active` : ""}`}
            onClick={onClick}
            disabled={currentStatus === status || isPending}
        >
            {label}
        </button>
    )
}