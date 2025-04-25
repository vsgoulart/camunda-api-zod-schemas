import { z } from 'zod';
import {
	advancedDateTimeFilterSchema,
	advancedIntegerFilterSchema,
	advancedStringFilterSchema,
	API_VERSION,
	getQueryRequestBodySchema,
	getQueryResponseBodySchema,
	userTaskVariableFilterSchema,
	type Endpoint,
} from './common';

const userTaskSchema = z.object({
	state: z.string(),
	processDefinitionVersion: z.number(),
	processDefinitionId: z.string(),
	processName: z.string().optional(),
	processInstanceKey: z.string(),
	processDefinitionKey: z.string(),
	name: z.string().optional(),
	elementId: z.string(),
	elementInstanceKey: z.string(),
	tenantId: z.string(),
	userTaskKey: z.string(),
	assignee: z.string().optional(),
	candidateGroups: z.array(z.string()),
	candidateUsers: z.array(z.string()),
	dueDate: z.string().optional(),
	followUpDate: z.string().optional(),
	creationDate: z.string(),
	completionDate: z.string().optional(),
	customHeaders: z.record(z.string(), z.any()).optional(),
	formKey: z.string().optional(),
	externalFormReference: z.string().optional(),
	priority: z.number(),
});
type UserTask = z.infer<typeof userTaskSchema>;

const getUserTask: Endpoint<Pick<UserTask, 'userTaskKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { userTaskKey } = params;

		return `/${API_VERSION}/user-tasks/${userTaskKey}`;
	},
};

const queryUserTasksRequestBodySchema = getQueryRequestBodySchema({
	sortFields: ['creationDate', 'completionDate', 'followUpDate', 'dueDate', 'priority'] as const,
	filter: userTaskSchema
		.pick({
			state: true,
			elementId: true,
			tenantId: true,
			processDefinitionId: true,
			userTaskKey: true,
			processDefinitionKey: true,
			processInstanceKey: true,
			elementInstanceKey: true,
		})
		.merge(
			z.object({
				assignee: z.union([userTaskSchema.shape.assignee, advancedStringFilterSchema]),
				priority: z.union([userTaskSchema.shape.priority, advancedIntegerFilterSchema]),
				candidateGroup: z.union([z.string(), advancedStringFilterSchema]),
				candidateUser: z.union([z.string(), advancedStringFilterSchema]),
				creationDate: z.union([userTaskSchema.shape.creationDate, advancedDateTimeFilterSchema]),
				completionDate: z.union([userTaskSchema.shape.completionDate, advancedDateTimeFilterSchema]),
				followUpDate: z.union([userTaskSchema.shape.followUpDate, advancedDateTimeFilterSchema]),
				dueDate: z.union([userTaskSchema.shape.dueDate, advancedDateTimeFilterSchema]),
				localVariables: z.array(userTaskVariableFilterSchema),
				processInstanceVariables: z.array(userTaskVariableFilterSchema),
			}),
		)
		.partial(),
});
type QueryUserTasksRequestBody = z.infer<typeof queryUserTasksRequestBodySchema>;

const queryUserTasksResponseBodySchema = getQueryResponseBodySchema(userTaskSchema);
type QueryUserTasksResponseBody = z.infer<typeof queryUserTasksResponseBodySchema>;

const queryUserTasks: Endpoint = {
	method: 'POST',
	getUrl() {
		return `/${API_VERSION}/user-tasks/search`;
	},
};

const formSchema = z.object({
	formKey: z.string(),
	tenantId: z.string(),
	bpmnId: z.string(),
	schema: z.string(),
	version: z.number(),
});
type Form = z.infer<typeof formSchema>;

const getForm: Endpoint<Pick<Form, 'formKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { formKey } = params;

		return `/${API_VERSION}/user-tasks/${formKey}/form`;
	},
};

const getTask: Endpoint<Pick<UserTask, 'userTaskKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { userTaskKey } = params;
		return `/${API_VERSION}/user-tasks/${userTaskKey}`;
	},
};

const endpoints = { getUserTask, queryUserTasks, getForm, getTask } as const;

export { endpoints, userTaskSchema, queryUserTasksResponseBodySchema, queryUserTasksRequestBodySchema, formSchema };
export type { UserTask, QueryUserTasksResponseBody, QueryUserTasksRequestBody, Form };
