import type { Project } from "../types/types"

type ProjectItemProps = {
    project: Project
}

export default function ProjectItem({ project }: ProjectItemProps) {
    return (
        <div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
        </div>
    )
}