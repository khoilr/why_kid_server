import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcrypt'

const prismaClient = new PrismaClient()

/**
 * Creates a new user user.
 *
 * @param userType - The user information including username, email, phone, and password.
 * @returns The newly created user user.
 */
const create = async (userType: { email?: string; phone?: string; password?: string; googleID?: string }) => {
	// Deconstruct
	const { email, phone, password, googleID } = userType

	// Hash password
	const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined

	const newUser = await prismaClient.user.create({
		data: {
			phone,
			email,
			password: hashedPassword,
			googleID,
		},
	})
	return newUser
}

/**
 * Finds and returns an user based on the provided ID.
 * @param ID - The ID of the user to find.
 * @returns The found user.
 */
const findOne = async (userType: { phone?: string; email?: string; ID?: string; googleID?: string }) => {
	const { phone, email, ID, googleID } = userType
	const user = await prismaClient.user.findFirst({
		where: {
			OR: [{ phone }, { email }, { ID }, { googleID }],
		},
	})

	return user
}

/**
 * Creates a new user if not found, or finds an existing user based on the provided user type.
 * @param userType - The user type object containing the properties to search for.
 * @returns The found user or the newly created user.
 */
const createOrFind = async (userType: {
	phone?: string
	email?: string
	ID?: string
	googleID?: string
	password?: string
}) => {
	const { phone, email, ID, googleID, password } = userType
	const user = await findOne({ phone, email, ID, googleID })
	return user ? user : create({ phone, email, password, googleID })
}

/**
 * Adds a role to a user.
 *
 * @param userID - The ID of the user.
 * @param role - The role to add.
 * @returns The updated user user.
 */
const addRole = async (userType: { ID: string; role: string }) => {
	// Deconstruct
	const { ID, role } = userType

	const roleEnum = Role[role.toUpperCase() as keyof typeof Role]
	if (!roleEnum) throw new Error('Invalid role')

	const user = await prismaClient.user.update({
		where: { ID },
		data: { roles: { push: roleEnum } },
	})

	return user
}

/**
 * Removes a role from a user.
 *
 * @param userID - The ID of the user.
 * @param role - The role to remove.
 * @returns The updated user user.
 */
const removeRole = async (userID: string, role: string) => {
	const roleEnum = Role[role.toUpperCase() as keyof typeof Role]
	if (!roleEnum) throw new Error('Invalid role')

	const user = await prismaClient.user.findUniqueOrThrow({
		where: { ID: userID },
	})

	const roles = user.roles.filter((r) => r !== roleEnum)
	await prismaClient.user.update({
		where: { ID: userID },
		data: { roles },
	})

	return user
}

/**
 * Clears all roles of a user.
 *
 * @param userID - The ID of the user.
 * @returns The updated user user.
 */
const clearRoles = async (userID: string) => {
	const user = await prismaClient.user.update({
		where: { ID: userID },
		data: { roles: [] },
	})

	return user
}

export { addRole, clearRoles, create, createOrFind, findOne, removeRole }
