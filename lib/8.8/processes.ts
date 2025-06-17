/**
 * This file exists only to avoid circular dependencies. Do not export it directly.
 */

import { z } from 'zod/v4';

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

export { processInstanceStateSchema, processInstanceSchema, processDefinitionSchema, processDefinitionStatisticSchema };
export type { ProcessInstance, ProcessInstanceState, StatisticName, ProcessDefinition, ProcessDefinitionStatistic };
