import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		dts({
			insertTypesEntry: true,
		}),
	],
	build: {
		lib: {
			entry: {
				main: resolve(__dirname, 'lib/main.ts'),
				'8.8': resolve(__dirname, 'lib/8.8/index.ts'),
				'8.8/authentication': resolve(__dirname, 'lib/8.8/authentication.ts'),
				'8.8/license': resolve(__dirname, 'lib/8.8/license.ts'),
				'8.8/process-instance': resolve(__dirname, 'lib/8.8/process-instance.ts'),
				'8.8/process-definition': resolve(__dirname, 'lib/8.8/process-definition.ts'),
				'8.8/user-task': resolve(__dirname, 'lib/8.8/user-task.ts'),
				'8.8/variable': resolve(__dirname, 'lib/8.8/variable.ts'),
				'8.8/decision-definition': resolve(__dirname, 'lib/8.8/decision-definition.ts'),
				'8.8/job': resolve(__dirname, 'lib/8.8/job.ts'),
			},
			formats: ['es'],
		},
		minify: false,
		rollupOptions: {
			external: ['zod'],
			preserveEntrySignatures: 'strict',
			output: {
				format: 'es',
				entryFileNames: '[name].js',
				preserveModules: true,
				preserveModulesRoot: 'lib',
			},
		},
	},
});
