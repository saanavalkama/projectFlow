import { Router } from "express";
import { projectController } from "./project_controller.js";

const router = Router()


router.get("/test", (_req, res) => {
  res.json({ ok: true });
});

router.post("/", projectController.createProject)
router.get("/", projectController.getAllProjects)

export default router

