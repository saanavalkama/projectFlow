import { Router } from "express";
import { taskController } from "./task_controller.js";
import { validate } from "../../middleware/validation.js";
import { createTaskSchema, projectIdParamSchema, taskIdParamSchema, taskQuerySchema, updateTaskStatusSchema } from "../../schemas/taskSchemas.js";
import { requireAuth } from "../../middleware/requireAuth.js";

const router = Router()

router.get(
    "/projects/:projectId/tasks",
    requireAuth,
    validate(projectIdParamSchema,"params"),
    validate(taskQuerySchema,"query"), 
    taskController.getTasksByProjectId
)
router.post(
    "/projects/:projectId/tasks", 
    requireAuth,
    validate(projectIdParamSchema,"params"),
    validate(createTaskSchema,"body"),
    taskController.createTask
)
router.put(
    "/tasks/:id", 
    requireAuth,
    validate(taskIdParamSchema, "params"),
    validate(updateTaskStatusSchema, "body"),
    taskController.updateTask
)
router.delete(
    "/tasks/:id", 
    requireAuth,
    validate(taskIdParamSchema, "params"),
    taskController.deleteTask
)
router.get(
    "/tasks/:id", 
    requireAuth,
    validate(taskIdParamSchema, "params"),
    taskController.getTaskById
)

export default router