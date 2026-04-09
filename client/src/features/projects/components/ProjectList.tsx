import { useProjects } from "../hooks/useProjects"
import { BounceLoader } from "react-spinners"
import ProjectCard from "./ProjectCard"
import { Link } from "react-router-dom"


export default function ProjectList() {

    const {data: projects, isPending, isError} = useProjects()

    if (isPending) return <BounceLoader />
    if (isError) return <div>Error occurred while fetching projects.</div>
    if(projects.length === 0) return <div>no projects</div>

    return (
        <ul className="h-full overflow-y-auto p-4">
            {projects.map(ele => (
                <Link to={`/app/projects/${ele.id}`} key={ele.id}>
                    <li>
                        <ProjectCard project={ele} />
                    </li>
                </Link>
            ))
            }
        </ul>
    )
}