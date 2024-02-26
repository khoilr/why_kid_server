import { Schema, model } from 'mongoose'
import { ILetterDrawingGame, LetterDrawingGameSchema } from './letter_drawing_game'
import { ILetterFindingGame, LetterFindingGameSchema } from './letter_finding_game'

interface IGame {
	game_id: string
}

const GameSchema = new Schema<IGame>(
	{
		game_id: String,
	},
	{
		discriminatorKey: 'type',
		collection: 'game',
	}
)

const Game = model<IGame>('game', GameSchema)

const LetterDrawingGame = Game.discriminator<ILetterDrawingGame>('LetterDrawingGame', LetterDrawingGameSchema)
const LetterFindingGame = Game.discriminator<ILetterFindingGame>('LetterFindingGame', LetterFindingGameSchema)
export { IGame, GameSchema, Game, LetterDrawingGame, LetterFindingGame }
