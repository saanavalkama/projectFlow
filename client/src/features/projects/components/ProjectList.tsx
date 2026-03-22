import { useQuery } from "@tanstack/react-query"
import { projectServices } from "../services/projectServices"
import type { Project } from "../types/types"
import ProjectListItem from "./ProjectListItem"
import ProjectForm from "./ProjectForm"
import { openAddProject, closeAddProject} from "../../ui/uiSlice"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import type { RootState } from "../../../app/store"


export default function ProjectList() {

    const isProjectFormVisible = useAppSelector((state: RootState) => state.ui.isAddProjectOpen)
    const isEditProjectOpen = useAppSelector((state: RootState) => state.ui.isEditProjectOpen)
    const dispatch = useAppDispatch()

    const {data: projects, isPending, isError} = useQuery({
        queryKey: ['projects'],
        queryFn: projectServices.getAllProjects
    })


    if (isPending) return <div>Loading...</div>
    if (isError) return <div>Error occurred while fetching projects.</div>

    return (
        <div>
            <button onClick={() => isProjectFormVisible ? dispatch(closeAddProject()) : dispatch(openAddProject())}>
                {isProjectFormVisible ? 'Hide Form' : 'Add New Project'}
            </button>
            {isProjectFormVisible && <ProjectForm />}
            {!isProjectFormVisible && !isEditProjectOpen && (
                <div>
                    <h2>Project List</h2>
                    <ul>
                        {projects?.map((project:Project) => <ProjectListItem key={project.id} project={project}  />)}
                    </ul>
                </div>
            )}   
        </div>
    )
}