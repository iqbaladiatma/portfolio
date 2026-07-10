import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		watch: {
			ignored: [
				'**/*.pdf',
				'**/*.data',
				'**/*.mjs',
				'**/*.map',
				'**/*.wasm',
				'**/*.bcmap',
				'**/*.pfb',
				'**/*.ttf'
			]
		}
	}
});
