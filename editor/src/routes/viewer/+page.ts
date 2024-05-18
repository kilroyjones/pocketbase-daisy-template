export const ssr = false;
export const prerender = true;

import { MapStore } from '$lib/stores/map.store';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	MapStore.load();
};
