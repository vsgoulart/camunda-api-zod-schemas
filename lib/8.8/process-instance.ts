import { z } from 'zod/v4';
import {
	API_VERSION,
	getCollectionResponseBodySchema,
	getQueryRequestBodySchema,
	getQueryResponseBodySchema,
	advancedDateTimeFilterSchema,
	advancedStringFilterSchema,
	basicStringFilterSchema,
	type Endpoint,
} from './common';
import { variableSchema } from './variable';
import { processDefinitionStatisticSchema } from './process-definition';

const processInstanceStateSchema = z.enum(['ACTIVE', 'COMPLETED', 'TERMINATED']);
type ProcessInstanceState = z.infer<typeof processInstanceStateSchema>;
type StatisticName = 'element-instances';

const processInstanceSchema = z.object({
	processDefinitionId: z.string(),
	processDefinitionName: z.string(),
	processDefinitionVersion: z.number(),
	processDefinitionVersionTag: z.string().optional(),
	startDate: z.string(),
	endDate: z.string().optional(),
	state: processInstanceStateSchema,
	hasIncident: z.boolean(),
	tenantId: z.string(),
	processInstanceKey: z.string(),
	processDefinitionKey: z.string(),
	parentProcessInstanceKey: z.string().optional(),
	parentElementInstanceKey: z.string().optional(),
});
type ProcessInstance = z.infer<typeof processInstanceSchema>;

const processInstanceVariableFilterSchema = z.object({
	name: z.string(),
	value: z.string(),
});

const advancedProcessInstanceStateFilterSchema = z
	.object({
		$eq: processInstanceStateSchema,
		$neq: processInstanceStateSchema,
		$exists: z.boolean(),
		$in: z.array(processInstanceStateSchema),
		$like: z.string(),
	})
	.partial();

const queryProcessInstancesRequestBodySchema = getQueryRequestBodySchema({
	sortFields: [
		'processInstanceKey',
		'processDefinitionId',
		'processDefinitionName',
		'processDefinitionVersion',
		'startDate',
		'endDate',
		'state',
		'tenantId',
	] as const,
	filter: z
		.object({
			processDefinitionId: advancedStringFilterSchema,
			processDefinitionName: advancedStringFilterSchema,
			processDefinitionVersion: z.number().int(),
			processDefinitionVersionTag: advancedStringFilterSchema,
			processDefinitionKey: basicStringFilterSchema,
			processInstanceKey: basicStringFilterSchema,
			parentProcessInstanceKey: basicStringFilterSchema,
			parentElementInstanceKey: basicStringFilterSchema,
			startDate: advancedDateTimeFilterSchema,
			endDate: advancedDateTimeFilterSchema,
			state: advancedProcessInstanceStateFilterSchema,
			hasIncident: z.boolean(),
			tenantId: advancedStringFilterSchema,
			variables: z.array(processInstanceVariableFilterSchema),
		})
		.partial(),
});
type QueryProcessInstancesRequestBody = z.infer<typeof queryProcessInstancesRequestBodySchema>;

const queryProcessInstancesResponseBodySchema = getQueryResponseBodySchema(processInstanceSchema);
type QueryProcessInstancesResponseBody = z.infer<typeof queryProcessInstancesResponseBodySchema>;

const cancelProcessInstanceRequestBodySchema = z
	.object({
		operationReference: z.number().int(),
	})
	.optional();
type CancelProcessInstanceRequestBody = z.infer<typeof cancelProcessInstanceRequestBodySchema>;

const queryProcessInstanceIncidentsRequestBodySchema = getQueryRequestBodySchema({
	sortFields: [
		'incidentKey',
		'errorType',
		'errorMessage',
		'state',
		'creationTime',
		'processInstanceKey',
		'processDefinitionKey',
		'elementInstanceKey',
		'jobKey',
		'tenantId',
	] as const,
	filter: z.never(),
});
type QueryProcessInstanceIncidentsRequestBody = z.infer<typeof queryProcessInstanceIncidentsRequestBodySchema>;

const getProcessInstance: Endpoint<Pick<ProcessInstance, 'processInstanceKey'>> = {
	method: 'GET',
	getUrl: ({ processInstanceKey }) => `/${API_VERSION}/process-instances/${processInstanceKey}`,
};

const createProcessInstanceRequestBodySchema = z.object({
	variables: z.record(z.string(), variableSchema).optional(),
	operationReference: z.number().optional(),
	startInstructions: z.array(z.string()).optional(),
	awaitCompletion: z.boolean().optional(),
	fetchVariables: z.array(z.string()).optional(),
	requestTimeout: z.number().optional(),
	...processInstanceSchema
		.pick({
			processDefinitionId: true,
			processDefinitionVersion: true,
			tenantId: true,
			processDefinitionKey: true,
		})
		.partial().shape,
});

type CreateProcessInstanceRequestBody = z.infer<typeof createProcessInstanceRequestBodySchema>;

const createProcessInstanceResponseBodySchema = z.object({
	variables: z.record(z.string(), variableSchema).optional(),
	...processInstanceSchema.pick({
		processDefinitionId: true,
		processDefinitionVersion: true,
		tenantId: true,
		processDefinitionKey: true,
		processInstanceKey: true,
	}).shape,
});

type CreateProcessInstanceResponseBody = z.infer<typeof createProcessInstanceResponseBodySchema>;

const createProcessInstance: Endpoint = {
	method: 'POST',
	getUrl: () => `/${API_VERSION}/process-instances`,
};

const queryProcessInstances: Endpoint = {
	method: 'POST',
	getUrl: () => `/${API_VERSION}/process-instances/search`,
};

const cancelProcessInstance: Endpoint<Pick<ProcessInstance, 'processInstanceKey'>> = {
	method: 'POST',
	getUrl: ({ processInstanceKey }) => `/${API_VERSION}/process-instances/${processInstanceKey}/cancellation`,
};

const queryProcessInstanceIncidents: Endpoint<Pick<ProcessInstance, 'processInstanceKey'>> = {
	method: 'POST',
	getUrl: ({ processInstanceKey }) => `/${API_VERSION}/process-instances/${processInstanceKey}/incidents/search`,
};

const getProcessInstanceCallHierarchy: Endpoint<Pick<ProcessInstance, 'processInstanceKey'>> = {
	method: 'GET',
	getUrl: ({ processInstanceKey }) => `/${API_VERSION}/process-instances/${processInstanceKey}/call-hierarchy`,
};

const callHierarchySchema = z.object({
	processInstanceKey: z.string(),
	processDefinitionKey: z.string(),
	processDefinitionName: z.string(),
});
type CallHierarchy = z.infer<typeof callHierarchySchema>;
const getProcessInstanceCallHierarchyResponseBodySchema = z.array(callHierarchySchema);
type GetProcessInstanceCallHierarchyResponseBody = z.infer<typeof getProcessInstanceCallHierarchyResponseBodySchema>;

const getProcessInstanceStatistics: Endpoint<GetProcessInstanceStatisticsParams> = {
	method: 'GET',
	getUrl: ({ processInstanceKey, statisticName = 'element-instances' }) =>
		`/${API_VERSION}/process-instances/${processInstanceKey}/statistics/${statisticName}`,
};

const getProcessInstanceStatisticsResponseBodySchema = getCollectionResponseBodySchema(
	processDefinitionStatisticSchema,
);
type GetProcessInstanceStatisticsResponseBody = z.infer<typeof getProcessInstanceStatisticsResponseBodySchema>;

type GetProcessInstanceStatisticsParams = Pick<ProcessInstance, 'processInstanceKey'> & {
	statisticName: StatisticName;
};

const getProcessInstanceSequenceFlows: Endpoint<Pick<ProcessInstance, 'processInstanceKey'>> = {
	method: 'GET',
	getUrl: ({ processInstanceKey }) => `/${API_VERSION}/process-instances/${processInstanceKey}/sequence-flows`,
};

const sequenceFlowSchema = z.object({
	processInstanceKey: z.string(),
	sequenceFlowId: z.string(),
	processDefinitionKey: z.string(),
	processDefinitionId: z.string(),
	elementId: z.string(),
	tenantId: z.string(),
});
type SequenceFlow = z.infer<typeof sequenceFlowSchema>;

const getProcessSequenceFlowsResponseBodySchema = getCollectionResponseBodySchema(sequenceFlowSchema);
type GetProcessSequenceFlowsResponseBody = z.infer<typeof getProcessSequenceFlowsResponseBodySchema>;

export {
	createProcessInstance,
	getProcessInstance,
	queryProcessInstances,
	cancelProcessInstance,
	queryProcessInstanceIncidents,
	getProcessInstanceCallHierarchy,
	getProcessInstanceStatistics,
	getProcessInstanceSequenceFlows,
	createProcessInstanceRequestBodySchema,
	createProcessInstanceResponseBodySchema,
	queryProcessInstancesRequestBodySchema,
	queryProcessInstancesResponseBodySchema,
	cancelProcessInstanceRequestBodySchema,
	queryProcessInstanceIncidentsRequestBodySchema,
	getProcessInstanceCallHierarchyResponseBodySchema,
	getProcessInstanceStatisticsResponseBodySchema,
	getProcessSequenceFlowsResponseBodySchema,
	processInstanceStateSchema,
	processInstanceSchema,
	sequenceFlowSchema,
	callHierarchySchema,
};
export type {
	CreateProcessInstanceRequestBody,
	CreateProcessInstanceResponseBody,
	QueryProcessInstancesRequestBody,
	QueryProcessInstancesResponseBody,
	CancelProcessInstanceRequestBody,
	QueryProcessInstanceIncidentsRequestBody,
	CallHierarchy,
	GetProcessInstanceCallHierarchyResponseBody,
	SequenceFlow,
	GetProcessSequenceFlowsResponseBody,
	ProcessInstanceState,
	StatisticName,
	ProcessInstance,
	GetProcessInstanceStatisticsResponseBody,
};
