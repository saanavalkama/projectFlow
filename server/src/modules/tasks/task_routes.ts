import { Router } from "express";
import { taskController } from "./task_controller.js";
import { validate } from "../../middleware/validation.js";
import { createTaskSchema, projectIdParamSchema, taskIdParamSchema, taskQuerySchema, updateTaskStatusSchema } from "../../schemas/taskSchemas.js";

const router = Router()

router.get(
    "/projects/:projectId/tasks",
    validate(projectIdParamSchema,"params"),
    validate(taskQuerySchema,"query"), 
    taskController.getTasksByProjectId
)
router.post(
    "/projects/:projectId/tasks", 
    validate(projectIdParamSchema,"params"),
    validate(createTaskSchema,"body"),
    taskController.createTask
)
router.put(
    "/tasks/:id", 
    validate(taskIdParamSchema, "params"),
    validate(updateTaskStatusSchema, "body"),
    taskController.updateTask
)
router.delete(
    "/tasks/:id", 
    validate(taskIdParamSchema, "params"),
    taskController.deleteTask
)
router.get(
    "/tasks/:id", 
    validate(taskIdParamSchema, "params"),
    taskController.getTaskById
)

export default router