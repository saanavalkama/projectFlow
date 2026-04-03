export type CardsResponse = {
    totalTasks: number,
    completionRate: number,
    overdueTasks: number
}

export  type StatusData = {
    status: string,
    count: number
}

export type TasksPerProjectData = {
    projectName: string,
    taskCount: number,
    projectId: string
}

export type TasksOverTimeData = {
    week: string,
    count: number
}