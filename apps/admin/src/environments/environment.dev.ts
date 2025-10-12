import { SVELTEKIT_API_URL } from '$env/static/private';
import { SVELTEKIT_AUTHORIZATION_KEY } from '$env/static/private';

export const environment = {
	apiUrl: SVELTEKIT_API_URL,
	token: SVELTEKIT_AUTHORIZATION_KEY
};
