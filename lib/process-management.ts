import { z } from 'zod';
import {
	advancedStringFilterSchema,
	API_VERSION,
	getQueryRequestBodySchema,
	getQueryResponseBodySchema,
	type Endpoint,
} from './common';
import { processInstanceSchema } from './operate';

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
		.partial()
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

const queryVariablesResponseBodySchema = getQueryResponseBodySchema(variableSchema);
type QueryVariablesResponseBody = z.infer<typeof queryVariablesResponseBodySchema>;

const queryVariables: Endpoint = {
	method: 'POST',
	getUrl() {
		return `/${API_VERSION}/variables/search`;
	},
};

const createProcessInstanceRequestBodySchema = processInstanceSchema
	.pick({
		processDefinitionId: true,
		processDefinitionVersion: true,
		tenantId: true,
		processDefinitionKey: true,
	})
	.partial()
	.merge(
		z.object({
			variables: z.record(variableSchema).optional(),
			operationReference: z.number().optional(),
			startInstructions: z.array(z.string()).optional(),
			awaitCompletion: z.boolean().optional(),
			fetchVariables: z.array(z.string()).optional(),
			requestTimeout: z.number().optional(),
		}),
	);
type CreateProcessInstanceRequestBody = z.infer<typeof createProcessInstanceRequestBodySchema>;

const createProcessInstanceResponseBodySchema = processInstanceSchema
	.pick({
		processDefinitionId: true,
		processDefinitionVersion: true,
		tenantId: true,
		processDefinitionKey: true,
		processInstanceKey: true,
	})
	.merge(
		z.object({
			variables: z.record(variableSchema).optional(),
		}),
	);
type CreateProcessInstanceResponseBody = z.infer<typeof createProcessInstanceResponseBodySchema>;

const createProcessInstance: Endpoint = {
	method: 'POST',
	getUrl() {
		return `/${API_VERSION}/process-instances`;
	},
};

const endpoints = { getVariable, queryVariables, createProcessInstance } as const;

export {
	endpoints,
	variableSchema,
	queryVariablesRequestBodySchema,
	queryVariablesResponseBodySchema,
	createProcessInstanceRequestBodySchema,
	createProcessInstanceResponseBodySchema,
};
export type {
	Variable,
	QueryVariablesRequestBody,
	QueryVariablesResponseBody,
	CreateProcessInstanceRequestBody,
	CreateProcessInstanceResponseBody,
};
