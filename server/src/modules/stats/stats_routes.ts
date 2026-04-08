import { Router } from 'express'
import { validate } from '../../middleware/validation.js'
import { statsQuerySchema } from '../../schemas/statsSchema.js'
import { statsController } from './stats_controller.js'
import { requireAuth } from '../../middleware/requireAuth.js'


const router = Router()

// Placeholder route for stats
router.get(
    '/stats/cards', 
    requireAuth,
    validate(statsQuerySchema, "query"),
    statsController.getCards
)

router.get(
    '/stats/status',
    requireAuth,
    validate(statsQuerySchema, "query"),
    statsController.getStatusDistribution
)

router.get(
    '/stats/per-project',
    requireAuth,
    validate(statsQuerySchema, "query"),
    statsController.getTasksPerProject
)

router.get(
    '/stats/over-time',
    requireAuth,
    validate(statsQuerySchema, "query"),
    statsController.getTasksOverTime

)

export default router
