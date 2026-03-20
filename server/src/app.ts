//creates the Express app, mounts middleware/routes
import express from 'express'
import projectRoutes from './modules/projects/project_routes.js'
import cors from 'cors'


export const app = express()

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json())

app.use('/projects', projectRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'working'})
})




