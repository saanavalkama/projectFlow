import { Router } from "express"
import { memberController } from "./members_controller.js"
import { validate } from "../../middleware/validation.js"
import { memberBodySchema, memberParamsSchema, updateMemberRoleSchema } from "../../schemas/memberSchemas.js"
import { projectIdParamSchema } from "../../schemas/taskSchemas.js"
import { requireAuth } from "../../middleware/requireAuth.js"
import { requireOwner } from "../../middleware/requireOwner.js"
import { requireProjectAccess } from "../../middleware/requireProjectAccess.js"

const router = Router()

router.get(
    "/:projectId/members",
    requireAuth,
    validate(projectIdParamSchema, "params"),
    requireProjectAccess,
    memberController.getMembers
)

router.put(
    "/:projectId/members/:userId",
    requireAuth,
    validate(memberParamsSchema, "params"),
    requireOwner,
    validate(updateMemberRoleSchema, "body"),
    memberController.updateMemberRole
)

router.delete(
    "/:projectId/members/:userId",
    requireAuth,
    validate(memberParamsSchema, "params"),
    requireOwner,
    memberController.removeMember
)

router.post(
    "/:projectId/members",
    requireAuth,
    validate(projectIdParamSchema, "params"),
    requireOwner,
    validate(memberBodySchema, "body"),
    memberController.addMember
)

export default router
