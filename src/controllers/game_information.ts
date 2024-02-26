import { Request, Response } from 'express'
import GameInformation from '../models/game/game_information'

const createNewGameInformation = async (req: Request, res: Response) => {
	const body = req.body
	if (body) {
		const gameInformation = new GameInformation({
			name: body.name,
			key: body.key,
			description: body.description,
		})
		const savedGI = await gameInformation.save()
		res.status(200).json(savedGI)
	} else {
		res.status(400).json({
			message: 'Body bot found!',
		})
	}
}

const getGameInformation = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)

		const data = await GameInformation.findOne({ id: id })
		if (!data) {
			res.status(400).json({
				message: `Game Information with ID '${id}' not found!`,
			})
		} else {
			res.status(200).json(data)
		}
	} catch (error) {
		res.status(400).json({
			status: 400,
			error,
		})
	}
}

const deleteGameInformation = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		const data = await GameInformation.findOneAndDelete({ id })
		if (!data) {
			res.status(400).json({
				message: `Game Information with ID '${id}' not found!`,
			})
		} else {
			res.status(200).json({
				staus: 200,
				message: 'Remove game information successfully',
				data,
			})
		}
	} catch (error) {
		res.status(400).json({
			status: 400,
			error,
		})
	}
}

export { createNewGameInformation, deleteGameInformation, getGameInformation }
