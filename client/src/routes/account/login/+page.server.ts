// Modules
import { pb } from '$lib/db/client';

// Types and constant
import { redirect, type Actions, type ServerLoad } from '@sveltejs/kit';
import type { User } from '$lib/types';

/**
 *
 */
export const load = (async ({}) => {
	console.log(pb.authStore.token);
	if (pb.authStore.isValid) {
		throw redirect(307, '/');
	}
	return {};
}) satisfies ServerLoad;

/**
 *
 */
export const actions = {
	login: async ({ request }) => {
		console.log('Login!');
		const data = Object.fromEntries(await request.formData()) as User;

		try {
			const { record, token } = await pb
				.collection('users')
				.authWithPassword(data.email, data.password);

			console.log(record, token);
		} catch (error: any) {
			console.log(error);
			console.log(error.response.data);
		}
		// throw redirect(303, '/');
	}
} satisfies Actions;
