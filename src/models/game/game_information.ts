import { Schema, model } from 'mongoose'
import IInformation from '../utils/information'

interface IGameInformation extends IInformation {
	name: string
	key: string
}

const GameInformationSchema = new Schema<IGameInformation>({
	description: String,
	name: String,
	key: String,
	id: Number,
})

const GameInformation = model<IGameInformation>('game_information', GameInformationSchema)

export default GameInformation
