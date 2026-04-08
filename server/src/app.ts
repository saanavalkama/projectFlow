//creates the Express app, mounts middleware/routes
import express from 'express'
import projectRoutes from './modules/projects/project_routes.js'
import taskRoutes from './modules/tasks/task_routes.js'
import cors from 'cors'
import { env } from './config/env.js'
import { errorHandler } from './middleware/errorHandler.js'
import statRoutes from './modules/stats/stats_routes.js'
import { sessionMiddleware } from './config/sessions.js'
import authRoutes from './modules/auth/auth_routes.js'


export const app = express()

app.use(express.json())

app.use(cors({
  origin: env.CLIENT_ORIGIN,
  credentials:true
}))

app.use(sessionMiddleware)

app.use('/projects', projectRoutes)
app.use("/", taskRoutes)
app.use("/", statRoutes)
app.use("/",authRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'working'})
})

app.use(errorHandler)




