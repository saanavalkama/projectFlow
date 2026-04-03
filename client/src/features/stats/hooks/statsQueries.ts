import { statsServices } from "../services/statsServices"
import { useQuery } from "@tanstack/react-query"


export const useCards = (projectId?: string) => {
    return useQuery({
        queryKey: ['stats', 'cards', projectId],
        queryFn: () => statsServices.getCards(projectId),
    })
}

export const useStatusDistribution = (projectId?: string) => {
    return useQuery({
        queryKey: ['stats', 'statusDistribution', projectId],
        queryFn: () => statsServices.getStatusDistribution(projectId),
    })
}

export const useTasksPerProject = () => {
    return useQuery({
        queryKey: ['stats', 'tasksPerProject'],
        queryFn: () => statsServices.getTasksPerProject(),
    })
}

export const useTasksOverTime = (projectId?: string) => {
    return useQuery({
        queryKey: ['stats', 'tasksOverTime', projectId],
        queryFn: () => statsServices.getTasksOverTime(projectId),
    })
}

