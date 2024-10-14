import { z } from 'zod';
import { API_VERSION, getQueryRequestBodySchema, getQueryResponseBodySchema, type Endpoint } from './common';

const userTaskSchema = z.object({
	state: z.string(),
	processDefinitionVersion: z.number(),
	processDefinitionId: z.string(),
	bpmnProcessId: z.string(),
	processInstanceKey: z.number(),
	processDefinitionKey: z.number(),
	elementId: z.string(),
	elementInstanceKey: z.number(),
	tenantId: z.string(),
	userTaskKey: z.number(),
	assignee: z.string(),
	candidateGroups: z.array(z.string()),
	candidateUsers: z.array(z.string()),
	dueDate: z.string(),
	followUpDate: z.string(),
	creationDate: z.string(),
	completionDate: z.string(),
	customHeaders: z.record(z.string(), z.any()),
	formKey: z.number(),
	externalFormReference: z.string(),
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
	sortFields: ['creationDate', 'completionDate'] as const,
	filter: userTaskSchema
		.pick({
			userTaskKey: true,
			state: true,
			assignee: true,
			elementId: true,
			candidateGroups: true,
			candidateUsers: true,
			processDefinitionKey: true,
			processInstanceKey: true,
			processDefinitionId: true,
			tenantId: true,
		})
		.merge(
			z.object({
				variables: z
					.array(
						z.object({
							name: z.string(),
							value: z.string(),
						}),
					)
					.optional(),
			}),
		),
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

const endpoints = { getUserTask, queryUserTasks } as const;

export { endpoints, userTaskSchema, queryUserTasksResponseBodySchema, queryUserTasksRequestBodySchema };
export type { UserTask, QueryUserTasksResponseBody, QueryUserTasksRequestBody };
