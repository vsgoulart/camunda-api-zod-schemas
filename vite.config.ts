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
				tasklist: resolve(__dirname, 'lib/tasklist.ts'),
				'process-management': resolve(__dirname, 'lib/process-management.ts'),
				operate: resolve(__dirname, 'lib/operate.ts'),
				optimize: resolve(__dirname, 'lib/optimize.ts'),
				identity: resolve(__dirname, 'lib/identity.ts'),
				management: resolve(__dirname, 'lib/management.ts'),
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
