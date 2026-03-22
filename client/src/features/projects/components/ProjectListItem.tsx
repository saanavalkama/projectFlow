import type { Project } from "../types/types"
import { Link } from "react-router-dom"

type ProjectItemProps = {
    project: Project
}

export default function ProjectItem({ project }: ProjectItemProps) {

    return (
        <div>
            <h3>{project.name}</h3>
            <Link to={`/projects/${project.id}`}>View Details</Link>
        </div>
    )
}