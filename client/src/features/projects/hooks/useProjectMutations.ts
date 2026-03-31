import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { NewProject } from "../types/types"
import { projectServices } from "../services/projectServices"
import {toast} from "sonner"
import { getErrorMessage } from "../../../utils/getErrorMessage"


export const useCreateProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (newProject: NewProject)=>projectServices.createProject(newProject),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['projects']})
            toast.success("Project created successfully!")
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, "Failed to create project. Please try again."))
        }
    })
}

export const useEditProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id,data}:{id:string, data: NewProject}) => projectServices.updateProject(id, data),
        onSuccess:(_,{id})=>{            
            queryClient.invalidateQueries({queryKey:['projects']})
            queryClient.invalidateQueries({queryKey:['project',id]})
            toast.success("Project updated successfully!")
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, "Failed to update project. Please try again."))
        }
    })
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id:string) => projectServices.deleteProject(id),
        onSuccess: (_,id) => {
            queryClient.invalidateQueries({queryKey:['projects']})
            queryClient.removeQueries({queryKey: ['project',id]})
            toast.success("Project deleted successfully!")
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, "Failed to delete project. Please try again."))
        }
    })
}

