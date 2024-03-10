export const prerender = false;

// Modules
import { pb } from '$lib/db/client';
import { user } from '$lib/stores/user.store';

// Types and constants
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	console.log(typeof window);
	if (typeof window == 'undefined') {
	} else {
		console.log(typeof window, typeof window == undefined);
		pb.authStore.loadFromCookie(document.cookie);
		pb.authStore.onChange(() => {
			user.set(pb.authStore.model);
			document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
		}, true);
	}
};
