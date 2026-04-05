import { useState } from "react"
import ProjectForm from "./ProjectForm"

export default function ProjectsSidepanel(){

    const [addFormOpen, setAddFormOpen] = useState(false)

    return(
        <div className="flex flex-col items-center">
            {addFormOpen && <ProjectForm setAddFormOpen={setAddFormOpen}/>}
            {!addFormOpen && <> 
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold rounded py-2 px-4 w-fit"
              onClick={()=>setAddFormOpen(true)}
            >+ Add Project</button>
            <h3>simple stats here</h3>
            <h3>Project updates here</h3>
            </>}
        </div>
    )
}