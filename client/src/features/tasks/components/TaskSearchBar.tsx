import { useEffect } from "react"
import { useTaskFilter } from "../hooks/useTaskStatusFilter"
import { useDebounce } from "../hooks/useDebounce"
import { useState } from "react"


export default function TaskSearchBar(){


    const { setSearch, currentSearchParam } = useTaskFilter()
    const [inputValue, setInputValue] = useState<string>(currentSearchParam)
    const debouncedSearch = useDebounce(inputValue.trim(), 300)

    useEffect(() => {
        setInputValue(currentSearchParam)
    }, [currentSearchParam])

    useEffect(() => {
        setSearch(debouncedSearch)
    }, [debouncedSearch, setSearch])

    return(
        <div>
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
    )
}