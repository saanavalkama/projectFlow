import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTaskFilter } from "../hooks/useTaskStatusFilter"

export default function TaskStatusFilter(){

    
    const {currentFilter, setFilter} = useTaskFilter()
    
    const filterOptions = [
        {value: 'all', label: "All"},
        {value: "to_do", label: "To do"},
        {value: "in_progress", label: "In progress"},
        {value: 'done', label: 'Done'}
    ]

    return(
       <Select 
         onValueChange={setFilter} 
         value={currentFilter}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status"/>
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map(ele => <SelectItem value={ele.value}>{ele.label}</SelectItem>)}
          </SelectContent>
       </Select>
    )
}