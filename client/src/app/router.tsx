import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Workspace from "../pages/Workspace";

const router =  createBrowserRouter([
  {
    path:"/",
    element: <AppLayout />, 
    children: [
      {index: true, element: <h2>home page coming later</h2>},
      {path: "workspace", element: <Workspace />},
      {path: "workspace/:projectId", element:<Workspace />},
      {path: "workspace/:projectId/tasks/:taskId", element:<Workspace/>},
      {path: "*", element: <h2>404 - Not Found</h2>},
      
    ]
  }
])

export default router;