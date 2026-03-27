export interface Task{
    title: string;
    details?: string;
    projectId: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    status: TaskStatus
}

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE"

export interface NewTask{
    title: string;
    details?: string;
}

export interface UpdateTaskStatusInput{
    projectId:string,
    id:string,
    status: TaskStatus
}

export interface DeleteTaskInput{
    projectId: string, 
    id:string
}