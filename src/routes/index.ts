import { Router } from 'express'
import createHttpError from 'http-errors'
import AuthRouter from './auth'
import TestRouter from './test'
import ChildrenRouter from './children'
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json";

const router = Router()

router.get('/', (req, res) => {
	res.send('<h1>Why Kid Server</h1>')
})

// config router
router.use('/auth', AuthRouter)
router.use('/test', TestRouter)
router.use('/children', ChildrenRouter)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Favicon
router.get('/favicon.ico', (req, res) => {
	res.status(204)
})

// Handle not found route
router.use((req, res) => {
	res.status(404).json(createHttpError(404, 'Route not found'))
})

export default router
