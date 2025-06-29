import { z } from 'zod';
import { API_VERSION, type Endpoint } from './common';

const currentUserSchema = z.object({
	userId: z.string(),
	userKey: z.number(),
	displayName: z.string(),
	authorizedComponents: z.array(z.string()),
	tenants: z.array(
		z.object({
			tenantId: z.string(),
			name: z.string(),
		}),
	),
	groups: z.array(z.string()),
	roles: z.array(z.string()),
	salesPlanType: z.string().nullable(),
	c8Links: z.array(
		z.object({
			name: z.string(),
			link: z.string(),
		}),
	),
	canLogout: z.boolean(),
	apiUser: z.boolean(),
});

type CurrentUser = z.infer<typeof currentUserSchema>;

const getCurrentUser: Endpoint = {
	method: 'GET',
	getUrl: () => `/${API_VERSION}/authentication/me`,
};

export { currentUserSchema, getCurrentUser };
export type { CurrentUser };
