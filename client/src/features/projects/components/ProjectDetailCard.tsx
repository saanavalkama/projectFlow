import type { Project } from "../types/types"

type ProjectDetailCardProps = {
    project: Project
}

export default function ProjectDetailCard({project}:ProjectDetailCardProps){
    return(
        <div>
            <h2>{project.name}</h2>
            <h4>{project.description}</h4>
            <p>Created at: {project.createdAt}</p>
            <p>Updated at: {project.updatedAt}</p>
        </div>
    )
}