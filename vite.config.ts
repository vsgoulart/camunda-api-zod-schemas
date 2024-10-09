import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		lib: {
			entry: [
				resolve(__dirname, 'lib/main.ts'),
				resolve(__dirname, 'lib/tasklist.ts'),
				resolve(__dirname, 'lib/process-management.ts'),
				resolve(__dirname, 'lib/operate.ts'),
				resolve(__dirname, 'lib/optimize.ts'),
				resolve(__dirname, 'lib/identity.ts'),
			],
			formats: ['es'],
		},
		rollupOptions: {
			external: ['zod'],
		},
	},
});
