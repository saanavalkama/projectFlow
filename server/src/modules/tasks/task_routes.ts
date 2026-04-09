import { Router } from "express";
import { taskController } from "./task_controller.js";
import { validate } from "../../middleware/validation.js";
import { createTaskSchema, projectIdParamSchema, projectTaskParamsSchema, taskQuerySchema, updateTaskStatusSchema } from "../../schemas/taskSchemas.js";
import { requireAuth } from "../../middleware/requireAuth.js";
import { requireTaskAccess } from "../../middleware/requireTaskAccess.js";

const router = Router()

router.get(
    "/projects/:projectId/tasks",
    requireAuth,
    validate(projectIdParamSchema,"params"),
    requireTaskAccess,
    validate(taskQuerySchema,"query"), 
    taskController.getTasksByProjectId
)
router.post(
    "/projects/:projectId/tasks", 
    requireAuth,
    validate(projectIdParamSchema,"params"),
    requireTaskAccess,
    validate(createTaskSchema,"body"),
    taskController.createTask
)
router.put(
    "/projects/:projectId/tasks/:id",
    requireAuth,
    validate(projectTaskParamsSchema, "params"),
    requireTaskAccess,
    validate(updateTaskStatusSchema, "body"),
    taskController.updateTask
)
router.delete(
    "/projects/:projectId/tasks/:id",
    requireAuth,
    validate(projectTaskParamsSchema, "params"),
    requireTaskAccess,
    taskController.deleteTask
)
router.get(
    "/projects/:projectId/tasks/:id",
    requireAuth,
    validate(projectTaskParamsSchema, "params"),
    requireTaskAccess,
    taskController.getTaskById
)

export default router