import { useNavigate } from "react-router-dom"
import { ArrowLeft, Pencil, Trash } from "lucide-react"
import { useMe } from "../../auth/hooks/useAuthQueries"

type Props = {
    name: string
    ownerId: string
}

export default function ProjectDetailBar({name, ownerId}: Props){

    const navigate = useNavigate()
    const { data: me } = useMe()

    const isOwner = me?.id === ownerId

    return(
        <div className="flex justify-between px-4 py-2">
            <div>
                <button
                  className="bg-zinc-600 hover:bg-zinc-900 rounded-full flex justify-center items-center p-1"
                  onClick={()=>navigate("/projects")}><ArrowLeft size={20}/></button>
            </div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <div className="flex gap-2">
                {isOwner && (
                    <>
                        <button
                          className="bg-yellow-600 rounded-full flex justify-center items-center p-1"
                        ><Pencil size={20}/></button>
                        <button
                            className="bg-red-600 rounded-full flex justify-center items-center p-1"
                        ><Trash size={20}/></button>
                    </>
                )}
            </div>
        </div>
    )
}
