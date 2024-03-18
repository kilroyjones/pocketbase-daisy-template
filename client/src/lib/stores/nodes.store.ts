import { writable, get } from 'svelte/store';
import { useSvelteFlow } from '@xyflow/svelte';

import type { Writable } from 'svelte/store';
import type { Node } from '@xyflow/svelte';
import type { NodeTitle } from '$lib/types';

export const nodes: Writable<Array<Node>> = writable([]);

const add = () => {};
const init = () => {
	// For testing
	/////
	nodes.update(() => [
		{
			id: '1',
			type: 'titleNode',
			data: { text: 'Node 1' },
			position: { x: 0, y: 0 }
		},
		{
			id: '2',
			type: 'titleNode',
			data: { text: 'Node 2' },
			position: { x: 0, y: 150 }
		},
		{
			id: '3',
			type: 'titleNode',
			data: { text: 'Node 3' },
			position: { x: 150, y: 150 }
		}
	]);
	/////
};
const remove = (id: string) => {};

export const NodeStore = {
	add,
	init,
	remove
};
