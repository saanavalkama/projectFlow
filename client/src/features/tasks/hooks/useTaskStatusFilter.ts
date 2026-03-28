import { useSearchParams} from "react-router-dom"
import { normalizeTaskStatus } from "../utils/normalizeStatus"

export function useTaskFilter(){
    const [searchParams, setSearchParams] = useSearchParams()
    const status = normalizeTaskStatus(searchParams.get("status"))
    const currentFilter = searchParams.get("status") ?? "all"

    function setFilter(filter: string){
        filter === "all" ? setSearchParams({}) : setSearchParams({status:filter})
    }

    return {status, currentFilter, setFilter}

}