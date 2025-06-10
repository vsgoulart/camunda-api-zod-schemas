import { z } from 'zod';
import { API_VERSION, getCollectionResponseBodySchema, type Endpoint } from './common';
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

const getProcessInstance: Endpoint<Pick<ProcessInstance, 'processInstanceKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { processInstanceKey } = params;

		return `/${API_VERSION}/process-instances/${processInstanceKey}`;
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

const getProcessInstanceSequenceFlows: Endpoint<Pick<ProcessInstance, 'processInstanceKey'>> = {
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

export {
	createProcessInstance,
	getProcessInstance,
	getProcessInstanceCallHierarchy,
	getProcessInstanceStatistics,
	getProcessInstanceSequenceFlows,
	createProcessInstanceRequestBodySchema,
	createProcessInstanceResponseBodySchema,
	getProcessInstanceCallHierarchyResponseBodySchema,
	getProcessInstanceStatisticsResponseBodySchema,
	getProcessSequenceFlowsResponseBodySchema,
	processInstanceStateSchema,
	processInstanceSchema,
	sequenceFlowSchema,
};
export type {
	CreateProcessInstanceRequestBody,
	CreateProcessInstanceResponseBody,
	CallHierarchy,
	GetProcessInstanceCallHierarchyResponseBody,
	SequenceFlow,
	GetProcessSequenceFlowsResponseBody,
	ProcessInstanceState,
	StatisticName,
	ProcessInstance,
	GetProcessInstanceStatisticsResponseBody,
};
