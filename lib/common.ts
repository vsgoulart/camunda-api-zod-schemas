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

interface Endpoint<URLParams extends object | null = null> {
	getUrl: (params: URLParams) => string;
	method: string;
}

export { API_VERSION, problemDetailsSchema };
export type { ProblemDetails, Endpoint };
