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

const processInstanceState = z.enum(['ACTIVE', 'COMPLETED', 'TERMINATED']);
type ProcessInstanceState = z.infer<typeof processInstanceState>;
type StatisticName = 'element-instances';

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

const processInstanceSchema = z.object({
	processDefinitionId: z.string(),
	processDefinitionName: z.string(),
	processDefinitionVersion: z.number(),
	processDefinitionVersionTag: z.string().optional(),
	startDate: z.string(),
	endDate: z.string().optional(),
	state: processInstanceState,
	hasIncident: z.boolean(),
	tenantId: z.string(),
	processInstanceKey: z.string(),
	processDefinitionKey: z.string(),
	parentProcessInstanceKey: z.string().optional(),
	parentElementInstanceKey: z.string().optional(),
});
type ProcessInstance = z.infer<typeof processInstanceSchema>;

const getProcessDefinition: Endpoint<Pick<ProcessDefinition, 'processDefinitionKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { processDefinitionKey } = params;

		return `/${API_VERSION}/process-definitions/${processDefinitionKey}`;
	},
};

const getProcessInstance: Endpoint<Pick<ProcessInstance, 'processInstanceKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { processInstanceKey } = params;

		return `/${API_VERSION}/process-instances/${processInstanceKey}`;
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
	$eq: processInstanceState.optional(),
	$neq: processInstanceState.optional(),
	$exists: z.boolean().optional(),
	$in: z.array(processInstanceState).optional(),
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

const decisionDefinitionSchema = z.object({
	decisionDefinitionId: z.string(),
	name: z.string(),
	version: z.number(),
	decisionRequirementsId: z.string(),
	tenantId: z.string(),
	decisionDefinitionKey: z.string(),
	decisionRequirementsKey: z.string(),
});
type DecisionDefinition = z.infer<typeof decisionDefinitionSchema>;

const getDecisionDefinitionXmlResponseBodySchema = z.string();
type GetDecisionDefinitionXmlResponseBody = z.infer<typeof getDecisionDefinitionXmlResponseBodySchema>;

type GetDecisionDefinitionXmlParams = Pick<DecisionDefinition, 'decisionDefinitionKey'>;

const getProcessInstanceStatistics: Endpoint<GetProcessInstanceStatisticsParams> = {
	method: 'GET',
	getUrl(params) {
		const { processInstanceKey, statisticName = 'element-instances' } = params;

		return `/${API_VERSION}/process-instances/${processInstanceKey}/statistics/${statisticName}`;
	},
};

const getProcessInstanceStatisticsResponseBodySchema = getCollectionResponseBodySchema(
	processDefinitionStatisticSchema,
);
type GetProcessInstanceStatisticsResponseBody = z.infer<typeof getProcessInstanceStatisticsResponseBodySchema>;

type GetProcessInstanceStatisticsParams = Pick<ProcessInstance, 'processInstanceKey'> & {
	statisticName: StatisticName;
};

const getProcessSequenceFlows: Endpoint<Pick<ProcessInstance, 'processInstanceKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { processInstanceKey } = params;

		return `/${API_VERSION}/process-instances/${processInstanceKey}/sequence-flows`;
	},
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

const getDecisionDefinitionXml: Endpoint<GetDecisionDefinitionXmlParams> = {
	method: 'GET',
	getUrl(params) {
		const { decisionDefinitionKey } = params;

		return `/${API_VERSION}/decision-definitions/${decisionDefinitionKey}/xml`;
	},
};

const getProcessInstanceCallHierarchy: Endpoint<Pick<ProcessInstance, 'processInstanceKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { processInstanceKey } = params;

		return `/${API_VERSION}/process-instances/${processInstanceKey}/call-hierarchy`;
	},
};

const callHierarchySchema = z.object({
	processInstanceKey: z.string(),
	processDefinitionKey: z.string(),
	processDefinitionName: z.string(),
});
type CallHierarchy = z.infer<typeof callHierarchySchema>;
const getProcessInstanceCallHierarchyResponseBodySchema = z.array(callHierarchySchema);
type GetProcessInstanceCallHierarchyResponseBody = z.infer<typeof getProcessInstanceCallHierarchyResponseBodySchema>;

const endpoints = {
	getDecisionDefinitionXml,
	getProcessDefinition,
	getProcessDefinitionStatistics,
	getProcessDefinitionXml,
	getProcessInstance,
	getProcessInstanceCallHierarchy,
	getProcessInstanceStatistics,
	getProcessSequenceFlows,
	queryProcessDefinitions,
} as const;

export {
	endpoints,
	decisionDefinitionSchema,
	getDecisionDefinitionXmlResponseBodySchema,
	getProcessDefinitionStatisticsRequestBodySchema,
	getProcessDefinitionStatisticsResponseBodySchema,
	getProcessInstanceCallHierarchyResponseBodySchema,
	getProcessInstanceStatisticsResponseBodySchema,
	getProcessSequenceFlowsResponseBodySchema,
	processDefinitionSchema,
	processInstanceSchema,
	queryProcessDefinitionsRequestBodySchema,
	queryProcessDefinitionsResponseBodySchema,
};
export type {
	CallHierarchy,
	DecisionDefinition,
	GetDecisionDefinitionXmlResponseBody,
	GetProcessDefinitionStatisticsRequestBody,
	GetProcessDefinitionStatisticsResponseBody,
	GetProcessInstanceCallHierarchyResponseBody,
	GetProcessInstanceStatisticsResponseBody,
	GetProcessSequenceFlowsResponseBody,
	ProcessDefinition,
	ProcessDefinitionStatistic,
	ProcessInstance,
	ProcessInstanceState,
	SequenceFlow,
	StatisticName,
	QueryProcessDefinitionsRequestBody,
	QueryProcessDefinitionsResponseBody,
};
