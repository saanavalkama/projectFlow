import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import { useState } from "react";

export default function ProjectSidebar(){

    const [isProjectFormOpen, setIsProjectFormOpen] = useState<boolean>(false)

    return(
        <div className="project-sidebar">
            {!isProjectFormOpen && 
            <>
              <ProjectList />
              <button onClick={()=>setIsProjectFormOpen(true)}>Add project</button>
            </>}
            {isProjectFormOpen && 
            <>
              <ProjectForm setIsProjectFormOpen={setIsProjectFormOpen} />
              <button onClick={()=>setIsProjectFormOpen(false)}>Close Form</button>
            </>}
        </div>
    )
}