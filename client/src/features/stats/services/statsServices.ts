import {api} from "../../../lib/api"
import type { CardsResponse, StatusData, TasksOverTimeData, TasksPerProjectData } from "../types/statTypes"

export const statsServices = {

    getCards: async (projectId?: string) => {
        const response = await api.get<CardsResponse>("/stats/cards", {params: {projectId}})
        return response.data
    },

    getStatusDistribution: async (projectId?: string) => {
        const response = await api.get<StatusData[]>("/stats/status", {params: {projectId}})
        return response.data
    },

    getTasksPerProject: async () => {
        const response = await api.get<TasksPerProjectData[]>("/stats/per-project")
        return response.data
    },

    getTasksOverTime: async (projectId?: string) => {
        const response = await api.get<TasksOverTimeData[]>("/stats/over-time", {params: {projectId}})
        return response.data
    }
}