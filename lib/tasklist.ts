import { z } from 'zod';
import { API_VERSION, type Endpoint } from './common';

const userTaskSchema = z.object({
	processDefinitionVersion: z.number(),
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
	customHeaders: z.record(z.string(), z.any()),
	formKey: z.number(),
	externalFormReference: z.string(),
});
type UserTask = z.infer<typeof userTaskSchema>;

const getUserTask: Endpoint<Pick<UserTask, 'userTaskKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { userTaskKey } = params;

		return `/${API_VERSION}/user-tasks/${userTaskKey}`;
	},
};

const endpoints = { getUserTask } as const;

export { endpoints, userTaskSchema };
export type { UserTask };
