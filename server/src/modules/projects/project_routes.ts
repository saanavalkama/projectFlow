import { Router } from "express";
import { projectController } from "./project_controller.js";
import { validate } from "../../middleware/validation.js";
import { idParamSchema, projectBodySchema } from "../../schemas/projectSchemas.js";

const router = Router()

router.post(
    "/",
    validate(projectBodySchema,"body"),
    projectController.createProject
)
router.get("/", projectController.getAllProjects)
router.delete(
    "/:id", 
    validate(idParamSchema,"params"),
    projectController.deleteProject
)
router.put(
    "/:id", 
    validate(idParamSchema,"params"),
    validate(projectBodySchema,"body"),
    projectController.updateProject
) 
router.get(
    "/:id", 
    validate(idParamSchema,"params"),
    projectController.getProjectById
)

export default router


