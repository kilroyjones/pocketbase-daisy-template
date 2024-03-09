import type { Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { pb } from '$lib/db/client';

type RegisterUser = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export const actions = {
	register: async ({ request }) => {
		const data = Object.fromEntries(await request.formData()) as RegisterUser;

		console.log(data);
		if (data.password !== data.confirmPassword) {
			return {
				success: false,
				msg: 'Passwords do not match'
			};
		}

		try {
			const record = await pb.collection('users').create({
				username: data.username,
				email: data.email,
				password: data.password,
				passwordConfirm: data.confirmPassword
			});
			console.log(record);
		} catch (error: any) {
			// TODO: Catch possible errors
			console.log(error);
			console.log(error.response.data);
		}

		throw redirect(303, '/account/login');
	}
} satisfies Actions;
