// import { Router } from 'express'

// import { Prisma } from '@prisma/client'
// import passport from '../utils/passport'

// const UserRouter = Router()

// UserRouter.post('/set-role', passport.authenticate('jwt'), async (req, res) => {
//     const { role } = req.body
//     const { ID } = req.user as { ID: string }

//     try {
//         const user = await Prisma.user.update({
//             where: { ID },
//             data: { roles: { push: role } },
//         })

//         res.status(200).json(user)
//     }
// })

// export default UserRouter
