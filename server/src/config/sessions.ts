import session from 'express-session'
import pgSession from 'connect-pg-simple'
import { env } from './env.js'

const pgStore = pgSession(session)

export const sessionMiddleware = session({
    store: new pgStore({
        conString: env.DATABASE_URL,
        tableName: 'user_session',
        createTableIfMissing: true
    }),
    secret: env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false, 
    cookie:{
        httpOnly: true,
        secure: false, //IN prod true
        sameSite:'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

})

