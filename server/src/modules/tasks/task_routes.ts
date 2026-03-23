import { Router } from "express";
import { taskController } from "./task_controller.js";

const router = Router()

router.get("/projects/:projectId/tasks", taskController.getTasksByProjectId)
router.post("/projects/:projectId/tasks", taskController.createTask)
router.put("/tasks/:id", taskController.updateTask)
router.delete("/tasks/:id", taskController.deleteTask)

export default router