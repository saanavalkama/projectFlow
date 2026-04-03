import { useTasksPerProject } from "../hooks/statsQueries"
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"

export default function TasksPerProject() {

    const { data, isPending, isError} = useTasksPerProject()

    if(isPending) return <div>Loading...</div>
    if(isError) return <div>Error loading tasks per project</div>

    return(
        <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="projectName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="taskCount" fill="#8884d8" />
        </BarChart>
    )
}