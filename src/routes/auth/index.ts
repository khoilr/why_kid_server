import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import { create, findOne as findOneUser } from '../../controllers/user'
import { generateJWT } from '../../utils/jwt'
import GoogleAuthRouter from './google'
import OTPRouter from './otp'

const AuthRouter = Router()

AuthRouter.post('/login', async (req, res) => {
	try {
		// Get the email and password from the request body
		const { email, password } = req.body

		// Check if email and password are provided
		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required' })
		}

		// Fetch the account from the database based on the email
		const user = await findOneUser({ email })
		if (!user) return res.status(404).json({ message: 'Account not found' })

		// Compare the provided password with the hashed password stored in the database
		const isPasswordValid = await bcrypt.compare(password, user.password!)
		if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' })

		// Generate an access token and refresh token using JWT
		const accessToken = generateJWT({ ID: user.ID }, '1d')
		const refreshToken = generateJWT({ ID: user.ID }, '7d')

		// Return the access token and refresh token in the response
		res
			.cookie('refreshToken', refreshToken, { httpOnly: true })
			.json({ message: 'Login successfully', refreshToken, accessToken })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal server error' })
	}
})

AuthRouter.post('/registry', async (req, res) => {
	// Get the email, phone number, and password from the request body
	const { email, phone, password } = req.body

	// Check if either email or phone is provided
	if (!email && !phone) {
		return res.status(400).json({ message: 'Either email or phone is required' })
	}

	// Check if password is provided
	if (!password) {
		return res.status(400).json({ message: 'Password is required' })
	}

	// Create the account
	try {
		await create({ email, phone, password })
		return res.json({ message: 'Account registered successfully' })
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				// Handle unique constraint error
				console.log(error)

				const conflictFields = (error.meta as { target: string[] }).target

				return res.status(409).json({
					message: 'Account with conflicting fields already exists',
					conflictFields,
				})
			}
		}
		return res.status(500).json({ message: 'Internal server error' })
	}
})

AuthRouter.post('/logout', async (req, res) => {
	res.clearCookie('refreshToken').header('authorization', '').json({ message: 'Logout successfully' })
})

AuthRouter.use('/google', GoogleAuthRouter)
AuthRouter.use('/otp', OTPRouter);

export default AuthRouter
