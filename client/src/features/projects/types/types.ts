export interface Project{
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface NewProject{
    name: string;
    description?: string;
}