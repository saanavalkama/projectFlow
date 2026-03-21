import { Router } from "express";
import { projectController } from "./project_controller.js";

const router = Router()


router.post("/", projectController.createProject)
router.get("/", projectController.getAllProjects)
router.delete("/:id", projectController.deleteProject)

export default router

