import { z } from 'zod';
import { advancedDateTimeFilterSchema, API_VERSION, basicStringFilterSchema, type Endpoint } from './common';

const processInstanceState = z.enum(['ACTIVE', 'COMPLETED', 'TERMINATED']);
type ProcessInstanceState = z.infer<typeof processInstanceState>;
type StatisticName = 'flownode-instances';

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

const processDefinitionStatisticSchema = z.object({
	flowNodeId: z.string(),
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

const getProcessDefinitionStatisticsRequestBodySchema = z.object({
	filter: z
		.object({
			startDate: advancedDateTimeFilterSchema.optional(),
			endDate: advancedDateTimeFilterSchema.optional(),
			state: advancedProcessInstanceStateFilter.optional(),
			hasIncident: z.boolean().optional(),
			tenantId: advancedDateTimeFilterSchema.optional(),
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
			parentFlowNodeInstanceKey: basicStringFilterSchema.optional(),
		})
		.optional(),
});

type GetProcessDefinitionStatisticsRequestBody = z.infer<typeof getProcessDefinitionStatisticsRequestBodySchema>;

const getProcessDefinitionStatisticsResponseBodySchema = z.object({ items: z.array(processDefinitionStatisticSchema) });
type GetProcessDefinitionStatisticsResponseBody = z.infer<typeof getProcessDefinitionStatisticsResponseBodySchema>;

type GetProcessDefinitionStatisticsParams = Pick<ProcessDefinition, 'processDefinitionId'> & {
	statisticName: StatisticName;
};

const getProcessDefinitionStatistics: Endpoint<GetProcessDefinitionStatisticsParams> = {
	method: 'POST',
	getUrl(params) {
		const { processDefinitionId, statisticName = 'flownode-instances' } = params;

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

const getDecisionDefinitionXml: Endpoint<GetDecisionDefinitionXmlParams> = {
	method: 'GET',
	getUrl(params) {
		const { decisionDefinitionKey } = params;

		return `/${API_VERSION}/decision-definitions/${decisionDefinitionKey}/xml`;
	},
};

const endpoints = {
	getProcessDefinition,
	getProcessDefinitionStatistics,
	getProcessDefinitionXml,
	getDecisionDefinitionXml,
} as const;

export {
	endpoints,
	getProcessDefinitionStatisticsRequestBodySchema,
	getProcessDefinitionStatisticsResponseBodySchema,
	processDefinitionSchema,
	decisionDefinitionSchema,
	getDecisionDefinitionXmlResponseBodySchema,
};
export type {
	GetProcessDefinitionStatisticsRequestBody,
	GetProcessDefinitionStatisticsResponseBody,
	DecisionDefinition,
	GetDecisionDefinitionXmlResponseBody,
	ProcessDefinition,
	ProcessInstanceState,
	StatisticName,
	ProcessDefinitionStatistic,
};
