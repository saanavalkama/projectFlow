import ProjectList from "../components/ProjectList"
import ProjectsSidepanel from "../components/ProjectsSidepanel"

export default function ProjectsPage(){

  

    return(
        <div className="flex flex-col w-full h-screen">
            <h2 className="text-center text-xl font-medium ">Projects</h2>
            <div className="flex flex-1 w-full flex-row p-5 gap-5 overflow-hidden">
                <div className="w-1/2 h-full overflow-hidden">
                    <ProjectList />
                </div>
                <div className="w-1/2">
                    <ProjectsSidepanel />
                </div>           
            </div>
        </div>
    )
}