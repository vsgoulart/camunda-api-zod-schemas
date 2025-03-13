import { z } from 'zod';
import {
	advancedDateTimeFilterSchema,
	API_VERSION,
	basicStringFilterSchema,
	getQueryResponseBodySchema,
	type Endpoint,
} from './common';

const processInstanceState = z.enum(['ACTIVE', 'COMPLETED', 'TERMINATED']);
type ProcessInstanceState = z.infer<typeof processInstanceState>;

const statisticName = z.enum(['flownode-instances']);
type StatisticName = z.infer<typeof statisticName>;

const processDefinitionSchema = z.object({
	processDefinitionKey: z.number(),
	processDefinitionId: z.string(),
	name: z.string().optional(),
	version: z.number(),
	versionTag: z.string().optional(),
	tenantId: z.string(),
	formKey: z.number(),
});
type ProcessDefinition = z.infer<typeof processDefinitionSchema>;

const getProcessDefinition: Endpoint<Pick<ProcessDefinition, 'processDefinitionKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { processDefinitionKey } = params;

		return `/${API_VERSION}/process-definitions/${processDefinitionKey}`;
	},
};

const processDefinitionStatisticsBodySchema = z.array(
	z.object({
		flowNodeId: z.string(),
		active: z.number(),
		canceled: z.number(),
		incidents: z.number(),
		completed: z.number(),
	}),
);

const getProcessDefinitionStatisticsRequestBodySchema = z.object({
	filter: z.object({
		startDate: advancedDateTimeFilterSchema.optional(),
		endDate: advancedDateTimeFilterSchema.optional(),
		state: processInstanceState.optional(),
		hasIncident: z.boolean().optional(),
		tenantId: advancedDateTimeFilterSchema.optional(),
		variables: z.array(
			z.object({
				name: z.string(),
				value: z.string(),
			}),
		),
		processInstanceKey: basicStringFilterSchema.optional(),
		parentProcessInstanceKey: basicStringFilterSchema.optional(),
		parentFlowNodeInstanceKey: basicStringFilterSchema.optional(),
	}),
});

type GetProcessDefinitionStatisticsRequestBody = z.infer<typeof getProcessDefinitionStatisticsRequestBodySchema>;

const getProcessDefinitionStatisticsResponseBodySchema = getQueryResponseBodySchema(
	processDefinitionStatisticsBodySchema,
);
type GetProcessDefinitionStatisticsResponseBody = z.infer<typeof getProcessDefinitionStatisticsResponseBodySchema>;

type GetProcessDefinitionStatisticsParams = {
	processDefinitionKey: string;
	statisticName: StatisticName;
};

const getProcessDefinitionStatistics: Endpoint<GetProcessDefinitionStatisticsParams> = {
	method: 'POST',
	getUrl(params) {
		const { processDefinitionKey, statisticName = 'flownode-instances' } = params;

		return `/${API_VERSION}/process-definitions/${processDefinitionKey}/statistics/${statisticName}`;
	},
};

const getProcessDefinitionXml: Endpoint<Pick<ProcessDefinition, 'processDefinitionKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { processDefinitionKey } = params;

		return `/${API_VERSION}/process-definitions/${processDefinitionKey}/xml`;
	},
};

const endpoints = { getProcessDefinition, getProcessDefinitionStatistics, getProcessDefinitionXml } as const;

export {
	endpoints,
	getProcessDefinitionStatisticsRequestBodySchema,
	getProcessDefinitionStatisticsResponseBodySchema,
	processDefinitionSchema,
	processInstanceState,
	statisticName,
};
export type {
	GetProcessDefinitionStatisticsParams,
	GetProcessDefinitionStatisticsRequestBody,
	GetProcessDefinitionStatisticsResponseBody,
	ProcessDefinition,
	ProcessInstanceState,
	StatisticName,
};
