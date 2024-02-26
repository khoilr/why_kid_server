import jwt from 'jsonwebtoken'

function generateJWT(payload: object, expiresIn: string): string {
	const secretKey = process.env.JWT_SECRET || 'secret'
	const token = jwt.sign(payload, secretKey, { expiresIn })

	console.log(payload)
	console.log(token)

	return token
}

export { generateJWT }
