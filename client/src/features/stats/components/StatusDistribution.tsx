import { BounceLoader } from "react-spinners"
import { useStatusDistribution } from "../hooks/statsQueries"
import {Pie, PieChart, Legend } from "recharts"

type StatusPieChartProps = {
    projectId?:string
}

export default function StatusPieChart({projectId}:StatusPieChartProps) {

    const { data, isPending, isError } = useStatusDistribution(projectId)
   
    if(isPending) return <BounceLoader />
    if(isError) return <div>Error loading status distribution</div>
    
    const COLORS = { TODO: '#94a3b8', IN_PROGRESS: '#6366f1', DONE: '#22c55e' }

    // transform data in the component
    const chartData = data.map(item => ({
        ...item,
        fill: COLORS[item.status as keyof typeof COLORS],
        nameKey: `${item.status} (${item.count})`
    }))


    return (
        <PieChart width={200} height={200}>
           <Pie
                data={chartData}
                innerRadius="80%"
                outerRadius="100%"
                cornerRadius={5}
                paddingAngle={5}
                dataKey="count"
                nameKey="status"
            />
            <Legend
                formatter={(_value, entry) => {
                const e = entry as any
                return `${e.payload.status} (${e.payload.count})`
             }}
            />
        </PieChart>
    )
}