import { Schema, model } from 'mongoose'
import IInformation from '../utils/information'

interface IUserRole extends IInformation {
	role: string
}
const UserRoleSchema = new Schema<IUserRole>({
	role: { type: String, required: true },
	description: String,
})
const UserRole = model('user_role', UserRoleSchema)

export { IUserRole, UserRoleSchema, UserRole }
