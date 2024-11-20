import { z } from 'zod';
import { API_VERSION, type Endpoint } from './common';

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

const getProcessDefinitionXml: Endpoint<Pick<ProcessDefinition, 'processDefinitionKey'>> = {
	method: 'GET',
	getUrl(params) {
		const { processDefinitionKey } = params;

		return `/${API_VERSION}/process-definitions/${processDefinitionKey}/xml`;
	},
};

const endpoints = { getProcessDefinition, getProcessDefinitionXml } as const;

export { endpoints, processDefinitionSchema };
export type { ProcessDefinition };
