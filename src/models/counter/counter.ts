import { Schema, model } from 'mongoose'

interface ICounter {
	model: string
	count: number
}

const CounterSchema = new Schema<ICounter>({
	model: {
		type: String,
		required: true,
	},
	count: {
		type: Number,
		default: 0,
	},
})
const Counter = model<ICounter>('counter', CounterSchema)

export default Counter
