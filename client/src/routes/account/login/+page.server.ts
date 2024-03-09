import { pb } from '$lib/db/client';
import { redirect, type Actions, type ServerLoad } from '@sveltejs/kit';

type User = {
	email: string;
	password: string;
};

export const load = (async ({}) => {
	if (pb.authStore.isValid) {
		throw redirect(307, '/home');
	}
	return {};
}) satisfies ServerLoad;

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
		throw redirect(303, '/');
	}
} satisfies Actions;
