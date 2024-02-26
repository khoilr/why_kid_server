import { Schema } from 'mongoose'
import IAsset from './asset'
import { ROffset } from './r_offet'

interface ObjectData {
	offset: ROffset
	asset_name: string
}

interface ILetterFindingGame {
	bg_url: string
	assets: IAsset[]
	objects: ObjectData[]
	time_limit: number
}

const LetterFindingGameSchema = new Schema<ILetterFindingGame>({
	bg_url: String,
	assets: {
		type: [
			{
				name: String,
				asset_url: String,
			},
		],
		default: [],
	},
	objects: {
		type: [
			{
				offset: {
					r_x: Number,
					r_y: Number,
				},
				asset_name: String,
			},
		],
		default: [],
	},
	time_limit: Number,
})

export { ObjectData, ILetterFindingGame, LetterFindingGameSchema }
