import { z } from 'zod';
import {
	API_VERSION,
	advancedStringFilterSchema,
	getQueryRequestBodySchema,
	getQueryResponseBodySchema,
	getEnumFilterSchema,
	type Endpoint,
	basicStringFilterSchema,
} from './common';

const jobStateSchema = z.enum([
	'CREATED',
	'COMPLETED',
	'FAILED',
	'RETRIES_UPDATED',
	'TIMED_OUT',
	'CANCELED',
	'ERROR_THROWN',
	'MIGRATED',
]);
const jobKindSchema = z.enum(['BPMN_ELEMENT', 'EXECUTION_LISTENER', 'TASK_LISTENER']);
const listenerEventTypeSchema = z.enum([
	'UNSPECIFIED',
	'START',
	'END',
	'CREATING',
	'ASSIGNING',
	'UPDATING',
	'COMPLETING',
	'CANCELING',
]);

const jobStateFilterSchema = getEnumFilterSchema(jobStateSchema);
const jobKindFilterSchema = getEnumFilterSchema(jobKindSchema);
const listenerEventTypeFilterSchema = getEnumFilterSchema(listenerEventTypeSchema);

const getJobsRequestBodySchema = getQueryRequestBodySchema({
	sortFields: [
		'jobKey',
		'type',
		'worker',
		'state',
		'kind',
		'listenerEventType',
		'retries',
		'isDenied',
		'deniedReason',
		'hasFailedWithRetriesLeft',
		'errorCode',
		'errorMessage',
		'customHeaders',
		'deadline',
		'endTime',
		'processDefinitionId',
		'processDefinitionKey',
		'processInstanceKey',
		'elementId',
		'elementInstanceKey',
		'tenantId',
	],
	filter: z.object({
		jobKey: basicStringFilterSchema.optional(),
		type: advancedStringFilterSchema.optional(),
		worker: advancedStringFilterSchema.optional(),
		state: jobStateFilterSchema.optional(),
		kind: jobKindFilterSchema.optional(),
		listenerEventType: listenerEventTypeFilterSchema.optional(),
		processDefinitionId: advancedStringFilterSchema.optional(),
		processDefinitionKey: basicStringFilterSchema.optional(),
		processInstanceKey: basicStringFilterSchema.optional(),
		elementId: advancedStringFilterSchema.optional(),
		elementInstanceKey: basicStringFilterSchema.optional(),
		tenantId: advancedStringFilterSchema.optional(),
	}),
});

type GetJobsRequestBody = z.infer<typeof getJobsRequestBodySchema>;

const getJobs: Endpoint = {
	method: 'POST',
	getUrl() {
		return `/${API_VERSION}/jobs/search`;
	},
};

const jobSchema = z.object({
	jobKey: z.string(),
	type: z.string(),
	worker: z.string(),
	state: jobStateSchema,
	kind: jobKindSchema,
	listenerEventType: listenerEventTypeSchema,
	retries: z.number(),
	isDenied: z.boolean(),
	deniedReason: z.string(),
	hasFailedWithRetriesLeft: z.boolean(),
	errorCode: z.string(),
	errorMessage: z.string(),
	customHeaders: z.record(z.string(), z.any()).optional(),
	deadline: z.string(),
	endTime: z.string(),
	processDefinitionId: z.string(),
	processDefinitionKey: z.string(),
	processInstanceKey: z.string(),
	elementId: z.string(),
	elementInstanceKey: z.string(),
	tenantId: z.string(),
});
type Job = z.infer<typeof jobSchema>;
const getJobsResponseBodySchema = getQueryResponseBodySchema(jobSchema);
type GetJobsResponseBody = z.infer<typeof getJobsResponseBodySchema>;

export {
	getJobs,
	getJobsRequestBodySchema,
	getJobsResponseBodySchema,
	jobSchema,
	jobStateSchema,
	jobKindSchema,
	listenerEventTypeSchema,
	jobStateFilterSchema,
	jobKindFilterSchema,
	listenerEventTypeFilterSchema,
};
export type { GetJobsRequestBody, GetJobsResponseBody, Job };
