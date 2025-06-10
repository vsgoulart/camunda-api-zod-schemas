import { z } from 'zod';
import { API_VERSION, type Endpoint } from './common';

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

export { getDecisionDefinitionXml, getDecisionDefinitionXmlResponseBodySchema, decisionDefinitionSchema };
export type { DecisionDefinition, GetDecisionDefinitionXmlResponseBody };
