import { Router } from "express";
import { projectController } from "./project_controller.js";
import { validate } from "../../middleware/validation.js";
import { idParamSchema, projectBodySchema } from "../../schemas/projectSchemas.js";
import { requireAuth } from "../../middleware/requireAuth.js";

const router = Router()

router.post(
    "/",
    requireAuth,
    validate(projectBodySchema,"body"),
    projectController.createProject
)
router.get(
    "/", 
    requireAuth,
    projectController.getAllProjects)

router.delete(
    "/:id", 
    requireAuth,
    validate(idParamSchema,"params"),
    projectController.deleteProject
)
router.put(
    "/:id", 
    requireAuth,
    validate(idParamSchema,"params"),
    validate(projectBodySchema,"body"),
    projectController.updateProject
) 
router.get(
    "/:id", 
    requireAuth,
    validate(idParamSchema,"params"),
    projectController.getProjectById
)

export default router


