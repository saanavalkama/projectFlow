import { BounceLoader } from "react-spinners"
import { useCards } from "../hooks/statsQueries"

type Props = {
    projectId?: string | undefined
}

export default function StatCards({ projectId }: Props){
   
    const { data, isPending, error } = useCards(projectId)

    if(isPending) return <BounceLoader />

    if(error) return <div>Error loading stats</div>

    return(
        <div>
            <div>Total Tasks: {data.totalTasks}</div>
            <div>Completed Tasks: {data.completionRate}%</div>
            <div>Overdue Tasks: {data.overdueTasks}</div>
        </div>
    )
}