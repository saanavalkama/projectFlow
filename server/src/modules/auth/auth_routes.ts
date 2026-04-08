import { Router } from "express";
import { authController } from "./auth_controller.js";
import { LoginSchema, UserRegisterBody, UserRegisterBodySchema } from "../../schemas/authSchemas.js";
import { validate } from "../../middleware/validation.js";
import { requireAuth } from "../../middleware/requireAuth.js";

const router = Router()

router.post(
    "/api/auth/register",
    validate(UserRegisterBodySchema, "body"),
    authController.register
)

router.post(
    "/api/auth/login",
    validate(LoginSchema, "body"),
    authController.login
)

router.post(
    "/api/auth/logout",
    requireAuth, 
    authController.logout
)

router.get(
    "/api/auth/me",
    requireAuth,
    authController.me
)

export default router