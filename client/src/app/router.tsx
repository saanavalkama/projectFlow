import { createBrowserRouter } from "react-router-dom";
import ProjectPage from "../features/projects/pages/ProjectPage";

const router =  createBrowserRouter([
  {
    path:"/",
    element: <h1>ProjectFlow</h1>
  },
 {
    path:"/login",
    element: <h1>Login</h1>
 },
 {
  path:"/projects",
  element: <ProjectPage />
 }
])

export default router;