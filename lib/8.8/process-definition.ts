import { z } from 'zod/v4';
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

const processDefinitionStatisticSchema = z.object({
	elementId: z.string(),
	active: z.number(),
	canceled: z.number(),
	incidents: z.number(),
	completed: z.number(),
});
type ProcessDefinitionStatistic = z.infer<typeof processDefinitionStatisticSchema>;

const getProcessDefinition: Endpoint<Pick<ProcessDefinition, 'processDefinitionKey'>> = {
	method: 'GET',
	getUrl: ({ processDefinitionKey }) => `/${API_VERSION}/process-definitions/${processDefinitionKey}`,
};

const getProcessDefinitionXml: Endpoint<Pick<ProcessDefinition, 'processDefinitionKey'>> = {
	method: 'GET',
	getUrl: ({ processDefinitionKey }) => `/${API_VERSION}/process-definitions/${processDefinitionKey}/xml`,
};

const getProcessStartForm: Endpoint<Pick<ProcessDefinition, 'processDefinitionKey'>> = {
	method: 'GET',
	getUrl: ({ processDefinitionKey }) => `/${API_VERSION}/process-definitions/${processDefinitionKey}/form`,
};

const advancedProcessInstanceStateFilterSchema = z
	.object({
		$eq: processInstanceStateSchema,
		$neq: processInstanceStateSchema,
		$exists: z.boolean(),
		$in: z.array(processInstanceStateSchema),
		$like: z.string(),
	})
	.partial();

const processDefinitionStatisticsFilterFieldsSchema = z.object({
	startDate: advancedDateTimeFilterSchema,
	endDate: advancedDateTimeFilterSchema,
	state: advancedProcessInstanceStateFilterSchema,
	hasIncident: z.boolean(),
	tenantId: advancedStringFilterSchema,
	variables: z.array(
		z.object({
			name: z.string(),
			value: z.string(),
		}),
	),
	processInstanceKey: basicStringFilterSchema,
	parentProcessInstanceKey: basicStringFilterSchema,
	parentElementInstanceKey: basicStringFilterSchema,
	batchOperationId: advancedStringFilterSchema,
	errorMessage: advancedStringFilterSchema,
	hasRetriesLeft: z.boolean(),
	elementInstanceState: advancedProcessInstanceStateFilterSchema,
	elementId: advancedStringFilterSchema,
	hasElementInstanceIncident: z.boolean(),
	incidentErrorHashCode: z.number(),
});

const getProcessDefinitionStatisticsRequestBodySchema = z.object({
	filter: z
		.object({
			$or: z.array(processDefinitionStatisticsFilterFieldsSchema.partial()),
			...processDefinitionStatisticsFilterFieldsSchema.shape,
		})
		.partial(),
});
type GetProcessDefinitionStatisticsRequestBody = z.infer<typeof getProcessDefinitionStatisticsRequestBodySchema>;

const getProcessDefinitionStatisticsResponseBodySchema = getCollectionResponseBodySchema(
	processDefinitionStatisticSchema,
);
type GetProcessDefinitionStatisticsResponseBody = z.infer<typeof getProcessDefinitionStatisticsResponseBodySchema>;

type GetProcessDefinitionStatisticsParams = Pick<ProcessDefinition, 'processDefinitionKey'> & {
	statisticName: StatisticName;
};

const getProcessDefinitionStatistics: Endpoint<GetProcessDefinitionStatisticsParams> = {
	method: 'POST',
	getUrl: ({ processDefinitionKey, statisticName = 'element-instances' }) =>
		`/${API_VERSION}/process-definitions/${processDefinitionKey}/statistics/${statisticName}`,
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
	getUrl: () => `/${API_VERSION}/process-definitions/search`,
};

export {
	getProcessDefinition,
	getProcessDefinitionXml,
	getProcessStartForm,
	getProcessDefinitionStatistics,
	queryProcessDefinitions,
	processDefinitionSchema,
	processDefinitionStatisticSchema,
	getProcessDefinitionStatisticsRequestBodySchema,
	getProcessDefinitionStatisticsResponseBodySchema,
	queryProcessDefinitionsRequestBodySchema,
	queryProcessDefinitionsResponseBodySchema,
};
export type {
	ProcessDefinition,
	ProcessDefinitionStatistic,
	GetProcessDefinitionStatisticsRequestBody,
	GetProcessDefinitionStatisticsResponseBody,
	QueryProcessDefinitionsRequestBody,
	QueryProcessDefinitionsResponseBody,
};
