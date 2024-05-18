export const ssr = false;
export const prerender = true;

import { MapStore } from '$lib/stores/map.store';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	await MapStore.load('llm-A7-linear-tree-5.json');
};
