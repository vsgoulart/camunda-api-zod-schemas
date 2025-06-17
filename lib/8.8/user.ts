import { z } from 'zod/v4';
import {
	API_VERSION,
	getQueryRequestBodySchema,
	getQueryResponseBodySchema,
	advancedStringFilterSchema,
	type Endpoint,
} from './common';

const userSchema = z.object({
	username: z.string(),
	name: z.string(),
	email: z.string(),
	userKey: z.string(),
});
type User = z.infer<typeof userSchema>;

const createUserRequestBodySchema = userSchema
	.pick({
		username: true,
		name: true,
		email: true,
	})
	.extend({
		password: z.string(),
	});
type CreateUserRequestBody = z.infer<typeof createUserRequestBodySchema>;

const createUserResponseBodySchema = userSchema;
type CreateUserResponseBody = z.infer<typeof createUserResponseBodySchema>;

const updateUserRequestBodySchema = userSchema
	.pick({
		username: true,
		name: true,
		email: true,
	})
	.extend({
		password: z.string(),
	})
	.partial();
type UpdateUserRequestBody = z.infer<typeof updateUserRequestBodySchema>;

const queryUsersRequestBodySchema = getQueryRequestBodySchema({
	sortFields: ['username', 'name', 'email'] as const,
	filter: z.object({
		username: z.union([z.string(), advancedStringFilterSchema]).optional(),
		name: z.union([z.string(), advancedStringFilterSchema]).optional(),
		email: z.union([z.string(), advancedStringFilterSchema]).optional(),
	}),
});
type QueryUsersRequestBody = z.infer<typeof queryUsersRequestBodySchema>;

const queryUsersResponseBodySchema = getQueryResponseBodySchema(userSchema);
type QueryUsersResponseBody = z.infer<typeof queryUsersResponseBodySchema>;

const createUser: Endpoint = {
	method: 'POST',
	getUrl() {
		return `/${API_VERSION}/users`;
	},
};

const queryUsers: Endpoint = {
	method: 'POST',
	getUrl() {
		return `/${API_VERSION}/users/search`;
	},
};

const getUser: Endpoint<Pick<User, 'username'>> = {
	method: 'GET',
	getUrl(params) {
		const { username } = params;

		return `/${API_VERSION}/users/${username}`;
	},
};

const deleteUser: Endpoint<Pick<User, 'username'>> = {
	method: 'DELETE',
	getUrl(params) {
		const { username } = params;

		return `/${API_VERSION}/users/${username}`;
	},
};

const updateUser: Endpoint<Pick<User, 'username'>> = {
	method: 'PATCH',
	getUrl(params) {
		const { username } = params;

		return `/${API_VERSION}/users/${username}`;
	},
};

export {
	createUser,
	queryUsers,
	getUser,
	deleteUser,
	updateUser,
	userSchema,
	createUserRequestBodySchema,
	createUserResponseBodySchema,
	updateUserRequestBodySchema,
	queryUsersRequestBodySchema,
	queryUsersResponseBodySchema,
};
export type {
	User,
	CreateUserRequestBody,
	CreateUserResponseBody,
	UpdateUserRequestBody,
	QueryUsersRequestBody,
	QueryUsersResponseBody,
};
