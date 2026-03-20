import { PrismaClient } from '../generated/prisma/client.js'
import { PrismaPg} from '@prisma/adapter-pg'


// Create a singleton instance of PrismaClient
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

export const prisma = new PrismaClient({adapter})



