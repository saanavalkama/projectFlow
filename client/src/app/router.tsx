import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Stats from "../pages/Stats";
import ProjectsPage from "@/features/projects/pages/ProjectsPage";
import ProjectDetailPage from "@/features/projects/pages/ProjectDetailPage";
import TaskDetailPage from "@/features/tasks/pages/TaskDetailPage";


const router =  createBrowserRouter([
  {
    path:"/",
    element: <AppLayout />, 
    children: [
      {index: true, element: <h2>home page coming later</h2>},
      {path: "/projects", element: <ProjectsPage/>},
      {path:"/projects/:projectId", element: <ProjectDetailPage />},
      {path:"/projects/:projectId/tasks/:taskId", element:<TaskDetailPage />},
      {path: "stats", element: <Stats />},
      {path: "*", element: <h2>404 - Not Found</h2>},
      
    ]
  }
])

export default router;