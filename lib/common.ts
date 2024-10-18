import { z } from 'zod';

const API_VERSION = 'v2';

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
	firstSortValues: z.tuple([z.string(), z.string()]),
	lastSortValues: z.tuple([z.string(), z.string()]),
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
	problemDetailsSchema,
	querySortOrderSchema,
	queryPageSchema,
	queryResponsePageSchema,
	getQueryResponseBodySchema,
	getQueryRequestBodySchema,
};
export type { ProblemDetails, QuerySortOrder, QueryPage, Endpoint, QueryResponseBody };
