import type { TaskStatus } from "../types/types"

type TaskFilter = "all" | "to_do" | "in_progress" | "done"

const filterToStatus: Record<TaskFilter, TaskStatus | undefined> = {
    all:undefined,
    to_do: "TODO",
    in_progress:"IN_PROGRESS",
    done: "DONE"
} 

const validFilters: TaskFilter[] = ["all", "to_do", "in_progress", "done"]

export function normalizeTaskStatus(param: string | null){
    if(!param) return undefined
    if(!validFilters.includes(param as TaskFilter)) return undefined
    return filterToStatus[param as TaskFilter]
}