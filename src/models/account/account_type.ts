import { Schema, model } from 'mongoose'
import IInformation from '../utils/information'

interface IAccountType extends IInformation {
	type: string
}

const AccountTypeSchema = new Schema<IAccountType>({
	type: {
		type: String,
		required: true,
	},
	description: String,
})

const AccountType = model<IAccountType>('account_type', AccountTypeSchema)

export { IAccountType, AccountTypeSchema, AccountType }
