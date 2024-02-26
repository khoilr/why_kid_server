import { Schema } from 'mongoose'
import { IGame } from './game'
import IAsset from './asset'
import IStep from './step'

interface ILetterDrawingGame extends IGame {
	letter: string
	steps: IStep[]
	assets: IAsset[]
}

const LetterDrawingGameSchema = new Schema<ILetterDrawingGame>({
	letter: { type: String, required: true },
	steps: {
		type: [
			{
				asset_name: String,
				postion: {
					r_x: Number,
					r_y: Number,
				},
			},
		],
		default: [],
	},
	assets: {
		type: [
			{
				name: String,
				asset_url: String,
			},
		],
		default: [],
	},
	game_id: Number,
})

export { ILetterDrawingGame, LetterDrawingGameSchema }
