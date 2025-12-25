import { defineNuxtPlugin } from '#app';
import { Leanbase } from '@leanbase.com/js';

export default defineNuxtPlugin(() => {
	const runtimeConfig = useRuntimeConfig();

	const leanbaseClient = new Leanbase(runtimeConfig.public.leanbasePublicKey, {
		host: runtimeConfig.public.leanbaseHost,
		api_host: runtimeConfig.public.leanbaseHost,
		defaults: runtimeConfig.public.leanbaseDefaults,
		person_profiles: 'identified_only',
		loaded: (instance) => {
			if (import.meta.env.MODE === 'development') instance.debug();
		},
	});

	return {
		provide: {
			leanbase: () => leanbaseClient,
		},
	};
});
