import { useState } from "react"
import { useProjects } from "../hooks/useProjects"
import { BounceLoader } from "react-spinners"
import ProjectCard from "./ProjectCard"
import { Link } from "react-router-dom"

type ProjectFilter = "ALL" | "OWN" | "MEMBER"

const TABS: { label: string; value: ProjectFilter }[] = [
    { label: "All", value: "ALL" },
    { label: "Own Projects", value: "OWN" },
    { label: "Member", value: "MEMBER" },
]

export default function ProjectList() {
    const [activeTab, setActiveTab] = useState<ProjectFilter>("ALL")

    const { data: projects, isPending, isError } = useProjects(activeTab)

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex border-b">
                {TABS.map(tab => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === tab.value
                                ? "border-b-2 border-primary text-primary"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {isPending ? (
                <BounceLoader />
            ) : isError ? (
                <div>Error occurred while fetching projects.</div>
            ) : projects.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground">No projects</div>
            ) : (
                <ul className="h-full overflow-y-auto p-4">
                    {projects.map(ele => (
                        <Link to={`/app/projects/${ele.id}`} key={ele.id}>
                            <li>
                                <ProjectCard project={ele} />
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    )
}