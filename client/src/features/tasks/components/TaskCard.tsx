import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import type { Task } from "../types/types"
import {format} from 'date-fns'

type Props = {
    task: Task
}

export default function TaskCard({task}:Props){
    return(
        <Card className="m-2 max-w-lg mx-auto">
            <CardHeader className="flex items-center justify-between ">
                <CardTitle>{task.title}</CardTitle>
                <p>{task.status}</p>
            </CardHeader>
            <CardFooter className="flex items-center justify-between">
                <p>Priority</p>
                <div>
                    {task.dueDate ? <p>due: {format(new Date(task.dueDate), "do MMM")}</p> : <p>no due date</p>}
                    <div className="flex items-center justify-center rounded-full w-8 h-8 bg-blue-800">SV</div>
                </div>
            </CardFooter>
        </Card>
    )
}