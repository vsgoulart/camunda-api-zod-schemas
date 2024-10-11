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

function getQueryRequestSortSchema(fields: [string, ...string[]]) {
	return z.array(
		z.object({
			field: z.enum(fields),
			order: z.enum(['asc', 'desc']).optional(),
		}),
	);
}

function getQueryRequestBodySchema<FilterSchema extends z.ZodTypeAny>(options: {
	sortFields: [string, ...string[]];
	filter: FilterSchema;
}) {
	const { sortFields, filter } = options;

	return z.object({
		sort: getQueryRequestSortSchema(sortFields).optional(),
		page: z
			.object({
				from: z.number().int(),
				limit: z.number().int(),
				searchBefore: z.tuple([z.string(), z.string()]),
				searchAfter: z.tuple([z.string(), z.string()]),
			})
			.optional(),
		filter: filter.optional(),
	});
}

interface Endpoint<URLParams extends object | null = null> {
	getUrl: (params: URLParams) => string;
	method: string;
}

export {
	API_VERSION,
	problemDetailsSchema,
	queryResponsePageSchema,
	getQueryResponseBodySchema,
	getQueryRequestBodySchema,
};
export type { ProblemDetails, Endpoint, QueryResponseBody };
