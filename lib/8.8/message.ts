import { z } from 'zod/v4';
import { API_VERSION, type Endpoint } from './common';

const publishMessageRequestBodySchema = z.object({
	name: z.string(),
	correlationKey: z.string(),
	timeToLive: z.number().int().optional(),
	messageId: z.string().optional(),
	variables: z.record(z.string(), z.unknown()).optional(),
	tenantId: z.string().optional(),
});
type PublishMessageRequestBody = z.infer<typeof publishMessageRequestBodySchema>;

const publishMessageResponseBodySchema = z.object({
	tenantId: z.string(),
	messageKey: z.string(),
});
type PublishMessageResponseBody = z.infer<typeof publishMessageResponseBodySchema>;

const correlateMessageRequestBodySchema = z.object({
	name: z.string(),
	correlationKey: z.string(),
	variables: z.record(z.string(), z.unknown()).optional(),
	tenantId: z.string().optional(),
});
type CorrelateMessageRequestBody = z.infer<typeof correlateMessageRequestBodySchema>;

const correlateMessageResponseBodySchema = z.object({
	tenantId: z.string(),
	messageKey: z.string(),
	processInstanceKey: z.string(),
});
type CorrelateMessageResponseBody = z.infer<typeof correlateMessageResponseBodySchema>;

const publishMessage: Endpoint = {
	method: 'POST',
	getUrl() {
		return `/${API_VERSION}/messages/publication`;
	},
};

const correlateMessage: Endpoint = {
	method: 'POST',
	getUrl() {
		return `/${API_VERSION}/messages/correlation`;
	},
};

export {
	publishMessage,
	correlateMessage,
	publishMessageRequestBodySchema,
	publishMessageResponseBodySchema,
	correlateMessageRequestBodySchema,
	correlateMessageResponseBodySchema,
};
export type {
	PublishMessageRequestBody,
	PublishMessageResponseBody,
	CorrelateMessageRequestBody,
	CorrelateMessageResponseBody,
};
