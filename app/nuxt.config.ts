export default defineNuxtConfig({
	devtools: { enabled: true },

	modules: ['@nuxtjs/apollo', '@nuxt/ui'],

	apollo: {
		clients: {
			default: {
				httpEndpoint: 'http://127.0.0.1:8000/graphql/',
			},
		},
	},
});
