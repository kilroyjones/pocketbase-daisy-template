// Needed the Svelteflow graph
export const ssr = false;
export const prerender = false;

// Modules
import { pb } from '$lib/db/client';
import { UserStore } from '$lib/stores/user.store';

// Types and constants
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	if (typeof window == 'undefined') {
		// TODO: Handle error
	} else {
		pb.authStore.loadFromCookie(document.cookie);
		pb.authStore.onChange(() => {
			UserStore.setState(pb.authStore.model);
			document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
		}, true);
	}
};
