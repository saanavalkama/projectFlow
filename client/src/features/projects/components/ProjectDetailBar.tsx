import { useNavigate } from "react-router-dom"
import { ArrowLeft, Pencil, Trash } from "lucide-react"
import { useDeleteProject } from "../hooks/useProjectMutations"

type Props = {
    name: string
    projectId: string
    isOwner: boolean
    setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProjectDetailBar({name, projectId, isOwner, setIsEditOpen}: Props){

    const navigate = useNavigate()
    const { mutate: deleteProject } = useDeleteProject()

    const handleDelete = () => {
        if(confirm(`Delete project "${name}"?`))
            deleteProject(projectId, { onSuccess: () => navigate("/app/projects") })
    }

    return(
        <div className="flex justify-between px-4 py-2">
            <div>
                <button
                  className="bg-zinc-600 hover:bg-zinc-900 rounded-full flex justify-center items-center p-1"
                  onClick={()=>navigate("/app/projects")}><ArrowLeft size={20}/></button>
            </div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <div className="flex gap-2">
                {isOwner && (
                    <>
                        <button
                          className="bg-yellow-600 rounded-full flex justify-center items-center p-1"
                          onClick={() => setIsEditOpen(prev => !prev)}
                        ><Pencil size={20}/></button>
                        <button
                            className="bg-red-600 rounded-full flex justify-center items-center p-1"
                            onClick={handleDelete}
                        ><Trash size={20}/></button>
                    </>
                )}
            </div>
        </div>
    )
}
