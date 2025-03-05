import { z } from 'zod';
import { API_VERSION, type Endpoint } from './common';

const variableSchema = z.object({
	name: z.string(),
	value: z.string(),
	fullValue: z.string(),
	tenantId: z.string(),
	isTruncated: z.boolean(),
	variableKey: z.string(),
	scopeKey: z.string(),
	processInstanceKey: z.string(),
});

type Variable = z.infer<typeof variableSchema>;

const getVariable: Endpoint<Pick<Variable, 'variableKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { variableKey } = params;
		return `/${API_VERSION}/variables/${variableKey}`;
	},
};

const endpoints = { getVariable } as const;

export { endpoints, variableSchema };
export type { Variable };
