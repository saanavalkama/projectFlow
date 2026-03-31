import type { Project } from "../types/types"

type ProjectDetailCardProps = {
    project: Project
}

export default function ProjectDetailCard({project}:ProjectDetailCardProps){

    return(
        <div>
            <h2>{project.name}</h2>
            {project.description ? <p>{project.description}</p> : <p>No description provided</p>}
            <p>Created at: {project.createdAt}</p>
            <p>Updated at: {project.updatedAt}</p>
        </div>
    )
}