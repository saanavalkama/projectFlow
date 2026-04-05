import { Router } from 'express'
import { validate } from '../../middleware/validation.js'
import { statsQuerySchema } from '../../schemas/statsSchema.js'
import { statsController } from './stats_controller.js'


const router = Router()

// Placeholder route for stats
router.get(
    '/stats/cards', 
    validate(statsQuerySchema, "query"),
    statsController.getCards
)

router.get(
    '/stats/status',
    validate(statsQuerySchema, "query"),
    statsController.getStatusDistribution
)

router.get(
    '/stats/per-project',
    validate(statsQuerySchema, "query"),
    statsController.getTasksPerProject
)

router.get(
    '/stats/over-time',
    validate(statsQuerySchema, "query"),
    statsController.getTasksOverTime

)

export default router
