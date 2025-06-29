import { z } from 'zod';

const API_VERSION = 'v2';

const advancedDateTimeFilterSchema = z.object({
	$eq: z.string().optional(),
	$neq: z.string().optional(),
	$exists: z.boolean().optional(),
	$gt: z.string().optional(),
	$gte: z.string().optional(),
	$lt: z.string().optional(),
	$lte: z.string().optional(),
	$in: z.array(z.string()).optional(),
});
type AdvancedDateTimeFilter = z.infer<typeof advancedDateTimeFilterSchema>;

const basicStringFilterSchema = z.object({
	$eq: z.string().optional(),
	$neq: z.string().optional(),
	$exists: z.boolean().optional(),
	$in: z.array(z.string()).optional(),
	$notIn: z.array(z.string()).optional(),
});
type BasicStringFilter = z.infer<typeof basicStringFilterSchema>;

const advancedStringFilterSchema = z.object({
	$eq: z.string().optional(),
	$neq: z.string().optional(),
	$exists: z.boolean().optional(),
	$in: z.array(z.string()).optional(),
	$notIn: z.array(z.string()).optional(),
	$like: z.string().optional(),
});
type AdvancedStringFilter = z.infer<typeof advancedStringFilterSchema>;

const advancedIntegerFilterSchema = z.object({
	$eq: z.number().int().optional(),
	$neq: z.number().int().optional(),
	$exists: z.boolean().optional(),
	$gt: z.number().int().optional(),
	$gte: z.number().int().optional(),
	$lt: z.number().int().optional(),
	$lte: z.number().int().optional(),
	$in: z.array(z.number().int()).optional(),
});
type AdvancedIntegerFilter = z.infer<typeof advancedIntegerFilterSchema>;

const userTaskVariableFilterSchema = z.object({
	name: z.string(),
	value: z.union([z.string(), advancedStringFilterSchema]),
});
type UserTaskVariableFilter = z.infer<typeof userTaskVariableFilterSchema>;

const problemDetailsSchema = z.object({
	type: z.string(),
	title: z.string(),
	status: z.number(),
	detail: z.string(),
	instance: z.string(),
});
type ProblemDetails = z.infer<typeof problemDetailsSchema>;

const querySortOrderSchema = z.enum(['asc', 'desc']);
type QuerySortOrder = z.infer<typeof querySortOrderSchema>;

const queryPageSchema = z
	.object({
		from: z.number().int(),
		limit: z.number().int(),
		before: z.string().optional(),
		after: z.string().optional(),
	})
	.partial();
type QueryPage = z.infer<typeof queryPageSchema>;

const queryResponsePageSchema = z.object({
	totalItems: z.number(),
	startCursor: z.string().optional(),
	endCursor: z.string().optional(),
});
type QueryResponsePage = z.infer<typeof queryResponsePageSchema>;

interface QueryResponseBody<Item> {
	items: Item[];
	page: QueryResponsePage;
}

function getQueryResponseBodySchema<ItemSchema extends z.ZodTypeAny>(
	itemSchema: ItemSchema,
): z.ZodType<QueryResponseBody<z.infer<ItemSchema>>> {
	return z.object({
		items: z.array(itemSchema),
		page: queryResponsePageSchema,
	});
}

function getCollectionResponseBodySchema<ItemSchema extends z.ZodTypeAny>(
	itemSchema: ItemSchema,
): z.ZodType<{ items: z.infer<ItemSchema>[] }> {
	return z.object({
		items: z.array(itemSchema),
	});
}

function getQueryRequestSortSchema<Fields extends [string, ...string[]]>(fields: Fields) {
	return z.array(
		z.object({
			field: z.enum(fields),
			order: z.enum(['asc', 'desc']).optional(),
		}),
	);
}

function getEnumFilterSchema<T extends [string, ...string[]]>(fields: z.ZodEnum<T>) {
	return z.object({
		$eq: fields.optional(),
		$neq: fields.optional(),
		$exists: z.boolean().optional(),
		$in: z.array(fields).optional(),
		$notIn: z.array(fields).optional(),
	});
}

function getQueryRequestBodySchema<
	FilterSchema extends z.ZodTypeAny,
	SortFields extends [string, ...string[]],
>(options: { sortFields: SortFields; filter: FilterSchema }) {
	const { sortFields, filter } = options;

	return z
		.object({
			sort: getQueryRequestSortSchema(sortFields),
			page: queryPageSchema,
			filter: filter,
		})
		.partial();
}

interface Endpoint<URLParams extends object | undefined = undefined> {
	getUrl: URLParams extends undefined
		? () => string
		: {} extends URLParams
			? (params?: URLParams) => string
			: (params: URLParams) => string;
	method: string;
}

const problemDetailResponseSchema = z.object({
	type: z.string(),
	title: z.string(),
	status: z.number().min(400).max(600),
	detail: z.string(),
	instance: z.string(),
});
type ProblemDetailsResponse = z.infer<typeof problemDetailResponseSchema>;

export {
	API_VERSION,
	advancedDateTimeFilterSchema,
	basicStringFilterSchema,
	advancedStringFilterSchema,
	advancedIntegerFilterSchema,
	userTaskVariableFilterSchema,
	problemDetailsSchema,
	querySortOrderSchema,
	queryPageSchema,
	queryResponsePageSchema,
	getCollectionResponseBodySchema,
	getQueryResponseBodySchema,
	getQueryRequestBodySchema,
	getEnumFilterSchema,
	problemDetailResponseSchema,
};
export type {
	AdvancedDateTimeFilter,
	BasicStringFilter,
	AdvancedStringFilter,
	AdvancedIntegerFilter,
	UserTaskVariableFilter,
	ProblemDetails,
	QuerySortOrder,
	QueryPage,
	Endpoint,
	QueryResponseBody,
	ProblemDetailsResponse,
};
