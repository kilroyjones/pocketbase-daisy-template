// Needed the Svelteflow graph
export const ssr = false;
export const prerender = false;

import { MapStore } from '$lib/stores/map.store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	MapStore.load();
};
