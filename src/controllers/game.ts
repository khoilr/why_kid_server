import { Request, Response } from 'express'
import { LetterDrawingGame, LetterFindingGame } from '../models/game/game'
import { logger } from '../models/utils/logger'

const addNewGameData = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		const body = req.body
		if (body) {
			let data
			switch (id) {
				case 1:
					data = new LetterFindingGame({
						game_id: id,
						...body,
					})
					break
				case 2:
					data = new LetterDrawingGame({
						game_id: id,
						...body,
					})
					break
				default:
			}
			if (!data) {
				throw new Error('Data not valid!')
			}
			const savedData = await data?.save()
			res.status(201).json(savedData)
		} else {
			throw new Error('No body found!')
		}
	} catch (error) {
		logger.error(error)
		res.status(400).json({
			status: 400,
			error,
		})
	}
}

export { addNewGameData }
