import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import session from 'express-session'
import logger from 'morgan'
import path from 'path'


// Load environment variables
config()

import ErrorHandler from './middlewares/error_handler'
import router from './routes/index'
import passport from './utils/passport'
import { CONNECTION_URI, PORT } from './helper/db_config'
import { connectToDB } from './helper/db_connect'

// Express app
const app = express()

// Config middlewares
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }))
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())
app.use(passport.session())

// Config route
app.use('/', router)

// Config error handler
app.use(ErrorHandler)

const startServer = async () => {
	try {
		// connect to mongodb
		await connectToDB(CONNECTION_URI);
		console.info("Connected to DB successfully")
		// start server
		app.listen(PORT, () => { console.info(`Server is started on port ${PORT}`); })
	} catch (error) {
		console.error("Error while starting server");
	}
}

// Start server
startServer();


