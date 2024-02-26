import { Schema, model } from 'mongoose'

interface AccountInterface {
	username?: string
	password: string
	phoneNumber: string
	accountType?: number
	parent?: number
	user_id?: number
}

const AccountSchema = new Schema<AccountInterface>(
	{
		username: String,
		password: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		accountType: Number,
		parent: Number,
		user_id: Number,
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
)

const AccountModel = model<AccountInterface>('account', AccountSchema)

export { AccountModel, AccountInterface }
