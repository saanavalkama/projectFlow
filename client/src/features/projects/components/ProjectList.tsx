import ProjectListItem from "./ProjectListItem"
import { useProjects } from "../hooks/useProjects"
import { BounceLoader } from "react-spinners"


export default function ProjectList() {

    const {data: projects, isPending, isError} = useProjects()

    if (isPending) return <BounceLoader />
    if (isError) return <div>Error occurred while fetching projects.</div>
    if(projects.length === 0) return <div>no projects</div>

    return (
        <div>
            {projects.map(ele => <ProjectListItem key={ele.id} project={ele} /> )}
        </div>
    )
}