import type { Project } from "../types/types"
import { NavLink } from "react-router-dom"


type ProjectItemProps = {
    project: Project
}

export default function ProjectItem({ project }: ProjectItemProps) {

    return (
        <li>
            <NavLink to={`/workspace/${project.id}`}>{project.name}</NavLink>
        </li>
    )
}