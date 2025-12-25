export default defineNuxtConfig({
	devtools: { enabled: true },

	modules: ['@nuxtjs/apollo', '@nuxt/ui'],

	apollo: {
		clients: {
			default: {
				httpEndpoint: 'http://127.0.0.1:8080/graphql/',
			},
		},
	},

	runtimeConfig: {
		public: {
			leanbasePublicKey: 'lbc_IUAiNcrmsBwZpCK4wQlPJmZfIql70y1SY3qKWQyEDdo',
			leanbaseHost: 'https://ingest-compass-25.leanflag.net',
			leanbaseDefaults: '2025-05-24',
		},
	},
});
