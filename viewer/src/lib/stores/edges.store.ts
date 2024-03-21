import { type Writable, writable } from 'svelte/store';
import type { Edge } from '@xyflow/svelte';

export const edges: Writable<Array<Edge>> = writable([]);

const add = () => {};
const init = () => {
	// For testing
	/////
	edges.update(() => [
		{
			id: '1-2',
			type: 'directionalEdge',
			source: '1',
			target: '2',
			label: 'Edge Text',
			style: `stroke: #0f0fff`
		},
		{
			id: '2-1',
			type: 'directionalEdge',
			source: '2',
			target: '3',
			label: 'Edge Text',
			style: `stroke: #0f0fff; stroke-dasharray: 5, 5;`
		}
	]);
	console.log('updated');
	/////
};
const remove = (id: string) => {};
const get = (id: string) => {};

export const EdgeStore = {
	add,
	init,
	remove
};
