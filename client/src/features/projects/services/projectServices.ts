import axios from "axios";
import { env } from "../../../config/env";

const API_URL = `${env.apiBaseUrl}/projects`

export const projectServices = {

    createProject: async (name: string, description: string) => {
        try {
            const response = await axios.post(API_URL, { name, description })
            return response.data
        } catch (error) {
            console.error('Error creating project:', error)
            throw error
        }
    },
    getAllProjects: async () => {
        try {
            const response = await axios.get(API_URL)
            return response.data
        } catch (error) {
            console.error('Error fetching projects:', error)
            throw error
        }  
    }
}