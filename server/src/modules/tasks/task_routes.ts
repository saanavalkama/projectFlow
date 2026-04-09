import { Router } from "express";
import { taskController } from "./task_controller.js";
import { validate } from "../../middleware/validation.js";
import { createTaskSchema, projectIdParamSchema, projectTaskParamsSchema, taskQuerySchema, updateTaskStatusSchema } from "../../schemas/taskSchemas.js";
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
    "/projects/:projectId/tasks/:id",
    requireAuth,
    validate(projectTaskParamsSchema, "params"),
    validate(updateTaskStatusSchema, "body"),
    taskController.updateTask
)
router.delete(
    "/projects/:projectId/tasks/:id",
    requireAuth,
    validate(projectTaskParamsSchema, "params"),
    taskController.deleteTask
)
router.get(
    "/projects/:projectId/tasks/:id",
    requireAuth,
    validate(projectTaskParamsSchema, "params"),
    taskController.getTaskById
)

export default router