import { useSearchParams } from "react-router-dom"
import { useTaskFilter } from "../hooks/useTaskStatusFilter"

export default function TaskStatusFilter(){

    const {currentFilter, setFilter} = useTaskFilter()
    
    const filterOptions = [
        {value: 'all', label: "All"},
        {value: "to_do", label: "To do"},
        {value: "in_progress", label: "In progress"},
        {value: 'done', label: 'Done'}
    ]

    function handleChange(event:React.ChangeEvent<HTMLSelectElement>){
        const value = event.target.value
        setFilter(value)
    }

    return(
        <div>
            <select
                value={currentFilter}
                onChange={handleChange}
            >
                {filterOptions.map(filter => (
                    <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
            </select>
        </div>
    )
}