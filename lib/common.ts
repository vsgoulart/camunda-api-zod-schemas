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

const advancedStringFilterSchema = z.object({
	$like: z.string().optional(),
});
type AdvancedStringFilter = z.infer<typeof advancedStringFilterSchema>;

const basicStringFilterSchema = z.object({
	$eq: z.string().optional(),
	$neq: z.string().optional(),
	$exists: z.boolean().optional(),
	$in: z.array(z.string()).optional(),
});
type BasicStringFilter = z.infer<typeof basicStringFilterSchema>;

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
		searchBefore: z.tuple([z.number(), z.number()]),
		searchAfter: z.tuple([z.number(), z.number()]),
	})
	.partial();
type QueryPage = z.infer<typeof queryPageSchema>;

const queryResponsePageSchema = z.object({
	totalItems: z.number(),
	firstSortValues: z.tuple([z.number(), z.number()]),
	lastSortValues: z.tuple([z.number(), z.number()]),
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

function getQueryRequestSortSchema<Fields extends [string, ...string[]]>(fields: Fields) {
	return z.array(
		z.object({
			field: z.enum(fields),
			order: z.enum(['asc', 'desc']).optional(),
		}),
	);
}

function getQueryRequestBodySchema<
	FilterSchema extends z.ZodTypeAny,
	SortFields extends [string, ...string[]],
>(options: {
	sortFields: SortFields;
	filter: FilterSchema;
}) {
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
	getUrl: URLParams extends undefined ? () => string : (params: URLParams) => string;
	method: string;
}

export {
	API_VERSION,
	advancedDateTimeFilterSchema,
	advancedStringFilterSchema,
	basicStringFilterSchema,
	problemDetailsSchema,
	querySortOrderSchema,
	queryPageSchema,
	queryResponsePageSchema,
	getQueryResponseBodySchema,
	getQueryRequestBodySchema,
};
export type {
	AdvancedDateTimeFilter,
	AdvancedStringFilter,
	BasicStringFilter,
	ProblemDetails,
	QuerySortOrder,
	QueryPage,
	Endpoint,
	QueryResponseBody,
};
