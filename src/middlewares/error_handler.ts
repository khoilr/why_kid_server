import { Request, Response } from 'express'

const ErrorHandler = (err: Error, req: Request, res: Response) => {
	console.error(err)
	res.status(500).json({
		message: 'Something went wrong!',
	})
}

export default ErrorHandler
