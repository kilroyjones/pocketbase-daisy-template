import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals }) => {
		locals.pb.authStore.clear();
		locals.user = null;
		throw redirect(301, '/');
	}
} satisfies Actions;
