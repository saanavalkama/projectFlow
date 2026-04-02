import { StatsRepository } from "./stats_repository.js"

type WeeklyTaskRow = {week: Date, count: bigint}

export const statsService = {
    getCards: async (projectId?: string) => {
        const [totalTasks, doneTasks, overdueTasks] = await Promise.all([
            StatsRepository.totalTasks(projectId),
            StatsRepository.doneTasks(projectId),
            StatsRepository.overdueTasks(projectId)
        ])
        const completionRate = totalTasks !== 0 ? Math.round((doneTasks / totalTasks) * 100) : 0
        return { totalTasks, completionRate, overdueTasks }
    },

    getStatusDistribution: async (projectId?: string) => {
        const rawDistribution = await StatsRepository.statusDistribution(projectId)
        return rawDistribution.map(item => ({
            status: item.status,
            count: item._count.id
        }))
    },

    getTasksPerProject: async () => {
        const rawData = await StatsRepository.projects()
        return rawData.map(item => ({
            projectId: item.id,
            projectName: item.name,
            taskCount: Number(item._count.task)
        }))
    },

    getTasksOverTime: async (projectId?: string) => {
        const raw = await StatsRepository.tasksByWeek(projectId) as WeeklyTaskRow[]
        return raw.map(item => ({
            week: item.week,
            count: Number(item.count),
        }))
    }
}