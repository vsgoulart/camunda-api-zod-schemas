import {z} from 'zod';
import {
	advancedStringFilterSchema,
	API_VERSION,
	getQueryRequestBodySchema,
	getQueryResponseBodySchema,
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
	getUrl: ({variableKey}) => `/${API_VERSION}/variables/${variableKey}`,
};

const queryVariablesRequestBodySchema = getQueryRequestBodySchema({
	sortFields: ['name', 'value', 'fullValue', 'tenantId', 'variableKey', 'scopeKey', 'processInstanceKey'] as const,
	filter: z
		.object({
			name: advancedStringFilterSchema,
			value: advancedStringFilterSchema,
			variableKey: advancedStringFilterSchema,
			scopeKey: advancedStringFilterSchema,
			processInstanceKey: advancedStringFilterSchema,
			...variableSchema.pick({
				tenantId: true,
				isTruncated: true,
			}).shape,
		})
		.partial(),
});
type QueryVariablesRequestBody = z.infer<typeof queryVariablesRequestBodySchema>;

const queryVariablesResponseBodySchema = getQueryResponseBodySchema(variableSchema);
type QueryVariablesResponseBody = z.infer<typeof queryVariablesResponseBodySchema>;

const queryVariables: Endpoint = {
	method: 'POST',
	getUrl: () => `/${API_VERSION}/variables/search`,
};

export {getVariable, queryVariables, variableSchema, queryVariablesRequestBodySchema, queryVariablesResponseBodySchema};
export type {Variable, QueryVariablesRequestBody, QueryVariablesResponseBody};
