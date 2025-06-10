import { z } from 'zod';
import {
	advancedDateTimeFilterSchema,
	API_VERSION,
	advancedStringFilterSchema,
	getCollectionResponseBodySchema,
	getQueryRequestBodySchema,
	getQueryResponseBodySchema,
	type Endpoint,
	basicStringFilterSchema,
} from './common';
import { processInstanceStateSchema, type StatisticName } from './process-instance';

const processDefinitionSchema = z.object({
	name: z.string().optional(),
	resourceName: z.string().optional(),
	version: z.number(),
	versionTag: z.string().optional(),
	processDefinitionId: z.string(),
	tenantId: z.string(),
	processDefinitionKey: z.string(),
});
type ProcessDefinition = z.infer<typeof processDefinitionSchema>;

const getProcessDefinition: Endpoint<Pick<ProcessDefinition, 'processDefinitionKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { processDefinitionKey } = params;

		return `/${API_VERSION}/process-definitions/${processDefinitionKey}`;
	},
};

const processDefinitionStatisticSchema = z.object({
	elementId: z.string(),
	active: z.number(),
	canceled: z.number(),
	incidents: z.number(),
	completed: z.number(),
});
type ProcessDefinitionStatistic = z.infer<typeof processDefinitionStatisticSchema>;

const advancedProcessInstanceStateFilter = z.object({
	$eq: processInstanceStateSchema.optional(),
	$neq: processInstanceStateSchema.optional(),
	$exists: z.boolean().optional(),
	$in: z.array(processInstanceStateSchema).optional(),
	$like: z.string().optional(),
});

const processDefinitionStatisticsFilterFields = {
	startDate: advancedDateTimeFilterSchema.optional(),
	endDate: advancedDateTimeFilterSchema.optional(),
	state: advancedProcessInstanceStateFilter.optional(),
	hasIncident: z.boolean().optional(),
	tenantId: advancedStringFilterSchema.optional(),
	variables: z
		.array(
			z.object({
				name: z.string(),
				value: z.string(),
			}),
		)
		.optional(),
	processInstanceKey: basicStringFilterSchema.optional(),
	parentProcessInstanceKey: basicStringFilterSchema.optional(),
	parentElementInstanceKey: basicStringFilterSchema.optional(),
	batchOperationId: advancedStringFilterSchema.optional(),
	errorMessage: advancedStringFilterSchema.optional(),
	hasRetriesLeft: z.boolean().optional(),
	elementInstanceState: advancedProcessInstanceStateFilter.optional(),
	elementId: advancedStringFilterSchema.optional(),
	hasElementInstanceIncident: z.boolean().optional(),
	incidentErrorHashCode: z.number().optional(),
};

const getProcessDefinitionStatisticsRequestBodySchema = z.object({
	filter: z
		.object({
			...processDefinitionStatisticsFilterFields,
			$or: z.array(z.object(processDefinitionStatisticsFilterFields).optional()).optional(),
		})
		.optional(),
});

type GetProcessDefinitionStatisticsRequestBody = z.infer<typeof getProcessDefinitionStatisticsRequestBodySchema>;

const getProcessDefinitionStatisticsResponseBodySchema = getCollectionResponseBodySchema(
	processDefinitionStatisticSchema,
);
type GetProcessDefinitionStatisticsResponseBody = z.infer<typeof getProcessDefinitionStatisticsResponseBodySchema>;

type GetProcessDefinitionStatisticsParams = Pick<ProcessDefinition, 'processDefinitionId'> & {
	statisticName: StatisticName;
};

const getProcessDefinitionStatistics: Endpoint<GetProcessDefinitionStatisticsParams> = {
	method: 'POST',
	getUrl(params) {
		const { processDefinitionId, statisticName = 'element-instances' } = params;

		return `/${API_VERSION}/process-definitions/${processDefinitionId}/statistics/${statisticName}`;
	},
};

const getProcessDefinitionXml: Endpoint<Pick<ProcessDefinition, 'processDefinitionKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { processDefinitionKey } = params;

		return `/${API_VERSION}/process-definitions/${processDefinitionKey}/xml`;
	},
};

const queryProcessDefinitionsRequestBodySchema = getQueryRequestBodySchema({
	sortFields: [
		'processDefinitionKey',
		'name',
		'resourceName',
		'version',
		'versionTag',
		'processDefinitionId',
		'tenantId',
	] as const,
	filter: processDefinitionSchema.partial(),
});

type QueryProcessDefinitionsRequestBody = z.infer<typeof queryProcessDefinitionsRequestBodySchema>;

const queryProcessDefinitionsResponseBodySchema = getQueryResponseBodySchema(processDefinitionSchema);
type QueryProcessDefinitionsResponseBody = z.infer<typeof queryProcessDefinitionsResponseBodySchema>;

const queryProcessDefinitions: Endpoint = {
	method: 'POST',
	getUrl() {
		return `/${API_VERSION}/process-definitions/search`;
	},
};

export {
	getProcessDefinition,
	getProcessDefinitionStatistics,
	queryProcessDefinitions,
	getProcessDefinitionXml,
	processDefinitionStatisticSchema,
	getProcessDefinitionStatisticsRequestBodySchema,
	getProcessDefinitionStatisticsResponseBodySchema,
	queryProcessDefinitionsRequestBodySchema,
	queryProcessDefinitionsResponseBodySchema,
	processDefinitionSchema,
};
export type {
	ProcessDefinition,
	ProcessDefinitionStatistic,
	QueryProcessDefinitionsRequestBody,
	QueryProcessDefinitionsResponseBody,
	GetProcessDefinitionStatisticsRequestBody,
	GetProcessDefinitionStatisticsResponseBody,
};
