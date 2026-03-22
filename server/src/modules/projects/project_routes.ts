import { Router } from "express";
import { projectController } from "./project_controller.js";

const router = Router()


router.post("/", projectController.createProject)
router.get("/", projectController.getAllProjects)
router.delete("/:id", projectController.deleteProject)
router.put("/:id", projectController.updateProject) 
router.get("/:id", projectController.getProjectById)

export default router


