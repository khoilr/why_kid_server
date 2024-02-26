import { Router } from 'express'
import passport from '../utils/passport'

const TestRouter = Router()

// Test health check
TestRouter.get('/health', (req, res) => {
	res.status(200).json({
		status: 'success',
		message: 'Server is running',
	})
})

// Test authorization
TestRouter.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
	console.log(req.isAuthenticated())
	console.log(req.user)
	res.status(200).json({
		status: 'success',
		message: 'This is a protected route',
	})
})

TestRouter.get('/unprotected', (req, res) => {
	res.status(200).json({
		status: 'success',
		message: 'This is an unprotected route',
	})
})

export default TestRouter
