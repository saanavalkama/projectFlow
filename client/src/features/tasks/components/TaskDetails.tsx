type TaskDetailProps = {
    taskId: string | undefined
}

export default function TaskDetails({taskId}:TaskDetailProps){

    if(!taskId) return <div>click task to show details</div>

    return(
        <div>
            <h2>implemented soon</h2>
        </div>
    )
}