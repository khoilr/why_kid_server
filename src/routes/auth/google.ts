import { Router } from 'express'
import passport from '../../utils/passport'

import { createOrFind } from '../../controllers/user'
import { generateJWT } from '../../utils/jwt'
const GoogleAuthRouter = Router()

GoogleAuthRouter.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }))
GoogleAuthRouter.get('/callback', passport.authenticate('google'), async (req, res) => {
	const googleUser: { id: string; displayName: string; emails: [{ value: string }] } = req.user as {
		id: string
		displayName: string
		emails: [{ value: string }]
	}

	const user = await createOrFind({ googleID: googleUser.id, email: googleUser.emails[0].value })

	console.log(user)

	const { ID } = user
	const accessToken = generateJWT({ ID }, '1d')
	const refreshToken = generateJWT({ ID }, '7d')

	res
		.cookie('refreshToken', refreshToken, { httpOnly: true })
		.json({ message: 'Login with Google successfully', refreshToken, accessToken })
})

export default GoogleAuthRouter
