import { useQuery } from "@tanstack/react-query"
import { projectServices } from "../services/projectServices"
import ProjectListItem from "./ProjectListItem"


export default function ProjectList() {

    const {data: projects, isPending, isError} = useQuery({
        queryKey: ['projects'],
        queryFn: projectServices.getAllProjects
    })

    if (isPending) return <div>Loading...</div>
    if (isError) return <div>Error occurred while fetching projects.</div>
    if(!projects) return <div>no projects</div>

    return (
        <div>
            {projects?.map(ele => <ProjectListItem key={ele.id} project={ele} /> )}
        </div>
    )
}