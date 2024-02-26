import { Schema, model } from 'mongoose'

interface IHighScore {
	user_id: number
	game_id: number
	score: number
	play_time: number
}

const HighScoreSchema = new Schema<IHighScore>(
	{
		user_id: Number,
		game_id: Number,
		score: Number,
		play_time: Number,
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
)

const HighScore = model<IHighScore>('high_score', HighScoreSchema)

export { IHighScore, HighScoreSchema, HighScore }
