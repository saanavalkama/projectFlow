import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth.js";
import { requireProjectAccess } from "../../middleware/requireProjectAcccess.js";
import { projectIdParamSchema } from "../../schemas/taskSchemas.js";
import { validate } from "../../middleware/validation.js";
import { activityController } from "./activity_controller.js";

const router = Router()

router.get(
    "/projects/:projectId/activity",
    requireAuth,
    validate(projectIdParamSchema, "params"),
    requireProjectAccess,
    activityController.getActivity
)


export default router