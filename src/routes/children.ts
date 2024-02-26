import { Router } from 'express'
import passport from '../utils/passport'

const ChildrenRouter = Router()

// Create a child from a parent
ChildrenRouter.post('/', passport.authenticate('jwt'), (req, res) => {
	console.log(req.isAuthenticated())
	console.log(req.user)

	res.status(200)
})

export default ChildrenRouter
