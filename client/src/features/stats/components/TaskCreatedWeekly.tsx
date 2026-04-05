import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { useTasksOverTime } from "../hooks/statsQueries"

type Props = {
    projectId?: string
}

export default function TaskCreatedWeekly({projectId}:Props){

    const {data, isPending, isError} = useTasksOverTime(projectId)

    console.log(data)

    if(isPending) return <div>Loading...</div>
    if(isError) return <div>Error loading weekly task creation data</div>

    return(
        <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    
    )
}   