//creates the Express app, mounts middleware/routes
import express from 'express'
import projectRoutes from './modules/projects/project_routes.js'
import taskRoutes from './modules/tasks/task_routes.js'
import cors from 'cors'
import { env } from './config/env.js'
import { errorHandler } from './middleware/errorHandler.js'


export const app = express()

app.use(cors({
  origin: env.CLIENT_ORIGIN
}))

app.use(express.json())

app.use('/projects', projectRoutes)
app.use("/", taskRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'working'})
})

app.use(errorHandler)




