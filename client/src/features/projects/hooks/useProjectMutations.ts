import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { NewProject } from "../types/types"
import { projectServices } from "../services/projectServices"


export const useCreateProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (newProject: NewProject)=>projectServices.createProject(newProject),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['projects']})
        }
    })
}

export const useEditProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id,data}:{id:string, data: NewProject}) => projectServices.updateProject(id, {
            ...data,
            description: data.description ?? ""
        }),
        onSuccess:(_,{id})=>{            
            queryClient.invalidateQueries({queryKey:['projects']})
            queryClient.invalidateQueries({queryKey:['project',id]})
        }

    })
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id:string) => projectServices.deleteProject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['projects']})
        }
    })
}

