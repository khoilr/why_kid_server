import { Schema, model } from 'mongoose'

interface IUser {
	name?: string
	gender?: boolean
	dob?: number // timestamp
	address?: string
	phone?: string
	is_active?: boolean
	role?: number
}

const UserSchema = new Schema<IUser>(
	{
		name: String,
		gender: Boolean,
		dob: Date,
		address: String,
		phone: String,
		is_active: Boolean,
		role: Number,
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
)

const User = model<IUser>('user', UserSchema)

export default User
