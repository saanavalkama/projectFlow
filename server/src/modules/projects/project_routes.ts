import { Router } from "express";
import { projectController } from "./project_controller.js";
import { validate } from "../../middleware/validation.js";
import { idParamSchema, projectBodySchema } from "../../schemas/projectSchemas.js";
import { requireAuth } from "../../middleware/requireAuth.js";
import { requireOwner } from "../../middleware/requireOwner.js";


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
    projectController.getAllProjects
)

router.delete(
    "/:id",
    requireAuth,
    validate(idParamSchema,"params"),
    requireOwner,
    projectController.deleteProject
)
router.put(
    "/:id",
    requireAuth,
    validate(idParamSchema,"params"),
    requireOwner,
    projectController.updateProject
)
router.get(
    "/:id", 
    requireAuth,
    validate(idParamSchema,"params"),
    projectController.getProjectById
)

export default router


