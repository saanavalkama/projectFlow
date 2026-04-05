import { differenceInDays } from "date-fns";

export function getDuedateInfo(dueDate:string | null ){

    if(!dueDate) return {text: "No duedate set", className:"text-zinc-100"}

    const days = differenceInDays(new Date(dueDate), new Date())

    if(days < 0) return {text:`${Math.abs(days)} days overdue`, className:"text-red-400"}
    if(days === 0) return {text:'Due today', className: 'text-amber-400'}
    if(days <= 3) return {text: `${days} days left`, className: 'text-amber-400'}
    if(days<=7) return {text: `${days} days left`, className: 'text-yellow-300'}
    return {text: `${days} days left`, className: 'text-teal-400'}
}