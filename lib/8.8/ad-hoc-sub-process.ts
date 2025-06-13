import { z } from 'zod';
import { API_VERSION, getCollectionResponseBodySchema, type Endpoint } from './common';

const activityTypeSchema = z.enum([
	'UNSPECIFIED',
	'PROCESS',
	'SUB_PROCESS',
	'EVENT_SUB_PROCESS',
	'INTERMEDIATE_CATCH_EVENT',
	'INTERMEDIATE_THROW_EVENT',
	'BOUNDARY_EVENT',
	'SERVICE_TASK',
	'RECEIVE_TASK',
	'USER_TASK',
	'MANUAL_TASK',
	'TASK',
	'MULTI_INSTANCE_BODY',
	'CALL_ACTIVITY',
	'BUSINESS_RULE_TASK',
	'SCRIPT_TASK',
	'SEND_TASK',
	'UNKNOWN',
]);
type ActivityType = z.infer<typeof activityTypeSchema>;

const adHocSubProcessActivityFilterSchema = z.object({
	processDefinitionKey: z.string(),
	adHocSubProcessId: z.string(),
});

const queryActivatableActivitiesRequestSchema = z.object({
	filter: adHocSubProcessActivityFilterSchema,
});
type QueryActivatableActivitiesRequest = z.infer<typeof queryActivatableActivitiesRequestSchema>;

const activatableActivitySchema = z.object({
	processDefinitionKey: z.string(),
	processDefinitionId: z.string(),
	adHocSubProcessId: z.string(),
	elementId: z.string(),
	elementName: z.string(),
	type: activityTypeSchema,
	documentation: z.string(),
	tenantId: z.string(),
});
type ActivatableActivity = z.infer<typeof activatableActivitySchema>;

const queryActivatableActivitiesResultSchema = getCollectionResponseBodySchema(activatableActivitySchema);
type QueryActivatableActivitiesResult = z.infer<typeof queryActivatableActivitiesResultSchema>;

const activateActivityWithinAdHocSubProcessResultSchema = z.object({
	elements: z.array(
		z.object({
			elementId: z.string(),
		}),
	),
});
type ActivateActivityWithinAdHocSubProcessResult = z.infer<typeof activateActivityWithinAdHocSubProcessResultSchema>;

const queryActivatableActivities: Endpoint = {
	method: 'POST',
	getUrl: () => `/${API_VERSION}/element-instances/ad-hoc-activities/search`,
};

const activateAdHocSubProcessActivities: Endpoint<{ adHocSubProcessInstanceKey: string }> = {
	method: 'POST',
	getUrl: ({ adHocSubProcessInstanceKey }) =>
		`/${API_VERSION}/element-instances/ad-hoc-activities/${adHocSubProcessInstanceKey}/activation`,
};

export {
	activityTypeSchema,
	queryActivatableActivitiesResultSchema,
	activateActivityWithinAdHocSubProcessResultSchema,
	queryActivatableActivities,
	activateAdHocSubProcessActivities,
};

export type {
	ActivityType,
	QueryActivatableActivitiesRequest,
	ActivatableActivity,
	QueryActivatableActivitiesResult,
	ActivateActivityWithinAdHocSubProcessResult,
};
