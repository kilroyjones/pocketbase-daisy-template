// Modules
import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';

// Types and constant
import type { Actions } from '@sveltejs/kit';
import type { ErrorDetails, ErrorLoginUser, FormErrors } from '$lib/types';
import type { PageServerLoad } from './$types';

/**
 * Checks if the authStore is valid
 * @returns
 */
export const load: PageServerLoad = async ({ locals }) => {
	return {};
};

export const actions = {
	/**
	 * Email and password auth.
	 *
	 * @param param0 (locals, request)
	 * @returns
	 */
	login: async ({ locals, request }) => {
		// Runs if no failures
		throw redirect(307, '/');
	},

	/**
	 * Google OAuth2
	 *
	 * We get the provider from list of possible providers (set in Pocketbase) by
	 * name and then set the cookie. If valid, we concat Google's auth url with
	 * the redirect set in Google console as well as our provider name see
	 * /account/oauth/google route.
	 *
	 * @param param0
	 */
	google: async ({ locals, cookies }) => {
		throw redirect(302, '/errors');
	}
} satisfies Actions;
