import { useSearchParams} from "react-router-dom"
import { normalizeTaskStatus } from "../utils/normalizeStatus"


export function useTaskFilter(){
    const [searchParams, setSearchParams] = useSearchParams()
    const status = normalizeTaskStatus(searchParams.get("status"))
    const search = searchParams.get("search") ?? undefined
    const currentFilter = searchParams.get("status") ?? "all"
    const currentSearchParam = searchParams.get("search") ?? ""

    function setFilter(filter: string){
        setSearchParams(prev => {
            const next = new URLSearchParams(prev)
            filter === "all" ? next.delete("status") : next.set("status", filter)
            return next
        })
    }

    function setSearch(value: string){
        setSearchParams(prev => {
            const next = new URLSearchParams(prev)
            value.trim() === "" ? next.delete("search") : next.set("search", value)
            return next
        }
    )}

    return {status, currentFilter, setFilter, currentSearchParam, setSearch, search}

}