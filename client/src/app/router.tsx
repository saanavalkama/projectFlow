import { createBrowserRouter } from "react-router-dom";
import ProjectPage from "../features/projects/pages/ProjectPage";
import AppLayout from "../layouts/AppLayout";
import ProjectDetails from "../features/projects/components/ProjectDetails";

const router =  createBrowserRouter([
  {
    path:"/",
    element: <AppLayout />, 
    children: [
      {index: true, element: <h2>home page coming later</h2>},
      {path: "projects", element: <ProjectPage />},
      {path: "*", element: <h2>404 - Not Found</h2>},
      {path: "projects/:id", element: <ProjectDetails />}
    ]
  }
])

export default router;