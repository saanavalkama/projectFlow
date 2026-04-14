export interface Task{
    title: string;
    details?: string;
    projectId: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    status: TaskStatus,
    dueDate: string | null;
}

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE"

export interface NewTask{
    title: string;
    details?: string;
    dueDate?: string;
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

export interface TaskAssignee{
    id:string,
    taskId:string,
    userId:string
    user: {
        id: string,
        name: string,
        email: string
    }
}

export interface TaskWithAssignees extends Task {
    taskAssignees: TaskAssignee[]
}