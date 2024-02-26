import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { createOrFind } from '../controllers/user'

// Load environment variables
const google_client_ID = process.env.GOOGLE_CLIENT_ID || ''
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET || ''
const jwt_secret = process.env.JWT_SECRET || ''

// Authorize with Google
passport.use(
	new GoogleStrategy(
		{
			clientID: google_client_ID,
			clientSecret: google_client_secret,
			callbackURL: 'http://localhost:3000/auth/google/callback',
			passReqToCallback: true,
		},
		(request, accessToken, refreshToken, profile, done) => {
			return done(null, profile)
		}
	)
)

// Authorize with JWT
passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwt_secret,
		},
		(payload, done) => {
			try {
				return payload ? done(null, payload) : done(null, false)
			} catch (error) {
				console.error(error)
				return done(error, false)
			}
		}
	)
)

// Serialize and deserialize for Google
passport.serializeUser((user, done) => {
	done(null, user)
})
passport.deserializeUser(async (user: { id: string; emails: [{ value: string }] }, done) => {
	const thisUser = await createOrFind({
		googleID: user.id,
		email: user.emails[0].value,
	})

	done(null, thisUser)
})

export default passport
