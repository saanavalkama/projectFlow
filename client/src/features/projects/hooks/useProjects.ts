import { useQuery } from "@tanstack/react-query";
import { projectServices } from "../services/projectServices";

type ProjectFilter = "ALL" | "OWN" | "MEMBER"

export const useProjects = (filter: ProjectFilter = "ALL") => {
    return useQuery({
        queryKey: ['projects', filter],
        queryFn: () => projectServices.getAllProjects(filter),
    })
}



