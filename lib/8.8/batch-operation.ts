import { z } from 'zod/v4';
import { API_VERSION, getQueryRequestBodySchema, getQueryResponseBodySchema, type Endpoint } from './common';

const batchOperationTypeSchema = z.enum([
	'CANCEL_PROCESS_INSTANCE',
	'RESOLVE_INCIDENT',
	'MIGRATE_PROCESS_INSTANCE',
	'MODIFY_PROCESS_INSTANCE',
]);
type BatchOperationType = z.infer<typeof batchOperationTypeSchema>;

const batchOperationStateSchema = z.enum([
	'CREATED',
	'ACTIVE',
	'SUSPENDED',
	'COMPLETED',
	'COMPLETED_WITH_ERRORS',
	'CANCELED',
	'INCOMPLETED',
]);
type BatchOperationState = z.infer<typeof batchOperationStateSchema>;

const batchOperationItemStateSchema = z.enum(['ACTIVE', 'COMPLETED', 'CANCELED', 'FAILED']);
type BatchOperationItemState = z.infer<typeof batchOperationItemStateSchema>;

const batchOperationSchema = z.object({
	batchOperationId: z.string(),
	state: batchOperationStateSchema,
	batchOperationType: batchOperationTypeSchema,
	startDate: z.string(),
	endDate: z.string().optional(),
	operationsTotalCount: z.number().int(),
	operationsFailedCount: z.number().int(),
	operationsCompletedCount: z.number().int(),
});
type BatchOperation = z.infer<typeof batchOperationSchema>;

const batchOperationItemSchema = z.object({
	batchOperationId: z.string(),
	itemKey: z.string(),
	processInstanceKey: z.string(),
	state: batchOperationItemStateSchema,
	processedDate: z.string().optional(),
	errorMessage: z.string().optional(),
});
type BatchOperationItem = z.infer<typeof batchOperationItemSchema>;

const queryBatchOperationsRequestBodySchema = getQueryRequestBodySchema({
	sortFields: ['batchOperationId', 'operationType', 'state', 'startDate', 'endDate'] as const,
	filter: z
		.object({
			batchOperationId: z.string(),
			operationType: batchOperationTypeSchema,
			state: batchOperationStateSchema,
		})
		.partial(),
});
type QueryBatchOperationsRequestBody = z.infer<typeof queryBatchOperationsRequestBodySchema>;

const queryBatchOperationsResponseBodySchema = getQueryResponseBodySchema(batchOperationSchema);
type QueryBatchOperationsResponseBody = z.infer<typeof queryBatchOperationsResponseBodySchema>;

const queryBatchOperationItemsRequestBodySchema = getQueryRequestBodySchema({
	sortFields: ['batchOperationId', 'itemKey', 'processInstanceKey', 'state'] as const,
	filter: z
		.object({
			batchOperationId: z.string(),
			itemKey: z.string(),
			processInstanceKey: z.string(),
			state: batchOperationItemStateSchema,
		})
		.partial(),
});
type QueryBatchOperationItemsRequestBody = z.infer<typeof queryBatchOperationItemsRequestBodySchema>;

const queryBatchOperationItemsResponseBodySchema = getQueryResponseBodySchema(batchOperationItemSchema);
type QueryBatchOperationItemsResponseBody = z.infer<typeof queryBatchOperationItemsResponseBodySchema>;

const getBatchOperation: Endpoint<{ batchOperationId: string }> = {
	method: 'GET',
	getUrl: ({ batchOperationId }) => `/${API_VERSION}/batch-operations/${batchOperationId}`,
};

const queryBatchOperations: Endpoint = {
	method: 'POST',
	getUrl: () => `/${API_VERSION}/batch-operations/search`,
};

const cancelBatchOperation: Endpoint<{ batchOperationId: string }> = {
	method: 'PUT',
	getUrl: ({ batchOperationId }) => `/${API_VERSION}/batch-operations/${batchOperationId}/cancellation`,
};

const suspendBatchOperation: Endpoint<{ batchOperationId: string }> = {
	method: 'PUT',
	getUrl: ({ batchOperationId }) => `/${API_VERSION}/batch-operations/${batchOperationId}/suspension`,
};

const resumeBatchOperation: Endpoint<{ batchOperationId: string }> = {
	method: 'PUT',
	getUrl: ({ batchOperationId }) => `/${API_VERSION}/batch-operations/${batchOperationId}/resumption`,
};

const queryBatchOperationItems: Endpoint = {
	method: 'POST',
	getUrl: () => `/${API_VERSION}/batch-operation-items/search`,
};

export {
	batchOperationTypeSchema,
	batchOperationStateSchema,
	batchOperationItemStateSchema,
	batchOperationSchema,
	batchOperationItemSchema,
	queryBatchOperationsRequestBodySchema,
	queryBatchOperationsResponseBodySchema,
	queryBatchOperationItemsRequestBodySchema,
	queryBatchOperationItemsResponseBodySchema,
	getBatchOperation,
	queryBatchOperations,
	cancelBatchOperation,
	suspendBatchOperation,
	resumeBatchOperation,
	queryBatchOperationItems,
};

export type {
	BatchOperationType,
	BatchOperationState,
	BatchOperationItemState,
	BatchOperation,
	BatchOperationItem,
	QueryBatchOperationsRequestBody,
	QueryBatchOperationsResponseBody,
	QueryBatchOperationItemsRequestBody,
	QueryBatchOperationItemsResponseBody,
};
