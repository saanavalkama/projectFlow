import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Stats from "../pages/Stats";
import ProjectsPage from "@/features/projects/pages/ProjectsPage";
import ProjectDetailPage from "@/features/projects/pages/ProjectDetailPage";
import TaskDetailPage from "@/features/tasks/pages/TaskDetailPage";
import LandingPage from "@/pages/LandingPage";
import Register from "@/features/auth/pages/Register";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import Login from "@/features/auth/pages/Login";


const router =  createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/app",

    element: <ProtectedRoute><AppLayout/></ProtectedRoute>, 
    children: [
      {index: true, element: <Navigate to="/app/projects" />},
      {path: "projects", element: <ProjectsPage/>},
      {path:"projects/:projectId", element: <ProjectDetailPage />},
      {path:"projects/:projectId/tasks/:taskId", element:<TaskDetailPage />},
      {path: "stats", element: <Stats />},
    ]
  }, 
  {path: "*", element: <h2>404 - Not Found</h2>},
])

export default router;