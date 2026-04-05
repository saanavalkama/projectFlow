import type { Project } from "../types/types"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '../../../components/ui/card'

type Props = {
    project: Project
}

export default function ProjectCard({project}:Props){
    return(
        <Card className="m-2 max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{project.name}</CardTitle>
                <p>Your title</p>
            </CardHeader>
             <CardContent>
                    <progress></progress>
                    <h3>1/3 done</h3>
                </CardContent>
                <CardFooter className="flex flex-row items-center justify-between">
                    <p>x members</p>
                    <p>overdue</p>
                </CardFooter> 
        </Card>
    )
}