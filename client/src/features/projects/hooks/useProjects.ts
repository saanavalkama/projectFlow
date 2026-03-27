import { useQuery } from "@tanstack/react-query";
import { projectServices } from "../services/projectServices";

export const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: ()=> projectServices.getAllProjects()
    })
}



