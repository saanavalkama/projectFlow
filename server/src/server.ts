//boot file, starts listening
import "dotenv/config"
import {app} from './app.js'
import {prisma} from './lib/prisma.js'
import { env } from "./config/env.js";

const PORT = env.PORT 

async function startServer() {

    try{
        await prisma.$connect()
        console.log('Connected to the database successfully.')

        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })  

        // Handle graceful shutdown
        const shutdown = async () => {
            console.log('Shutting down server...')
            server.close(async() => {
                await prisma.$disconnect()
                process.exit(0)
                
            })
        }

        process.on('SIGINT', shutdown)
        process.on('SIGTERM', shutdown)
       
    } catch (error) {
        console.error('Error connecting to the database:', error)
        process.exit(1)
    }
}

void startServer()