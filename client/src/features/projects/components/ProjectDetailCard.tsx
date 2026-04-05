import type { Project } from "../types/types"

type ProjectDetailCardProps = {
    project: Project
}

export default function ProjectDetailCard({project}:ProjectDetailCardProps){

    return(
        <div className="h-full">
            <h2>{project.name}</h2>
            {project.description ? <p>{project.description}</p> : <p>No description provided</p>}
            <p>Created at: {new Date(project.createdAt).toLocaleDateString()}</p>
            <p>Updated at: {new Date(project.updatedAt).toLocaleDateString()}</p>
        </div>
    )
}