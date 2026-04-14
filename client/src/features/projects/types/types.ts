export interface Project{
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    ownerId: string;
}

export interface NewProject{
    name: string;
    description?: string;
}

export interface ActivityLog {
    id: string,
    createdAt:string,
    projectId:string,
    action:LogAction
    metadata: object,
}

export type LogAction = 
    "MEMBER_ADDED" | "TASK_CREATED" | "TASK_STATUS_CHANGED" |
    "TASK_ASSIGNED" | "TASK_UNASSIGNED" | "TASK_DUE_SOON"


