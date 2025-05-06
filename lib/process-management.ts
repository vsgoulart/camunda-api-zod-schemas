import { z } from 'zod';
import {
	advancedStringFilterSchema,
	API_VERSION,
	getCollectionResponseBodySchema,
	getQueryRequestBodySchema,
	type Endpoint,
} from './common';

const variableSchema = z.object({
	name: z.string(),
	value: z.string(),
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

const queryVariablesRequestBodySchema = getQueryRequestBodySchema({
	sortFields: ['name', 'value', 'fullValue', 'tenantId', 'variableKey', 'scopeKey', 'processInstanceKey'] as const,
	filter: variableSchema
		.pick({
			tenantId: true,
			isTruncated: true,
		})
		.merge(
			z.object({
				name: advancedStringFilterSchema.optional(),
				value: advancedStringFilterSchema.optional(),
				variableKey: advancedStringFilterSchema.optional(),
				scopeKey: advancedStringFilterSchema.optional(),
				processInstanceKey: advancedStringFilterSchema.optional(),
			}),
		),
});
type QueryVariablesRequestBody = z.infer<typeof queryVariablesRequestBodySchema>;

const queryVariablesResponseBodySchema = getCollectionResponseBodySchema(variableSchema);
type QueryVariablesResponseBody = z.infer<typeof queryVariablesResponseBodySchema>;

const queryVariables: Endpoint = {
	method: 'POST',
	getUrl() {
		return `/${API_VERSION}/variables/search`;
	},
};

const endpoints = { getVariable, queryVariables } as const;

export { endpoints, variableSchema, queryVariablesRequestBodySchema, queryVariablesResponseBodySchema };
export type { Variable, QueryVariablesRequestBody, QueryVariablesResponseBody };
