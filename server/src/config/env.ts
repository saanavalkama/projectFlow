const DATABASE_URL = process.env.DATABASE_URL
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN
const PORT = process.env.PORT

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is missing")
}

if (!CLIENT_ORIGIN) {
  throw new Error("CLIENT_ORIGIN is missing")
}

if (!PORT) {
  throw new Error("PORT is missing")
}

export const env = {
  DATABASE_URL,
  CLIENT_ORIGIN,
  PORT: Number(PORT),
}

