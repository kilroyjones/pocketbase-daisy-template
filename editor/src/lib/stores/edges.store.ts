import { type Writable, writable } from 'svelte/store';
import { get } from 'svelte/store';
import type { Edge } from '@xyflow/svelte';

const loadInitialEdges = (): Edge[] => {
	const edges = localStorage.getItem('edges');
	return edges ? JSON.parse(edges) : [];
};

export const edges: Writable<Array<Edge>> = writable(loadInitialEdges());
export const selectedEdge: Writable<Edge | undefined> = writable(undefined);

edges.subscribe(($edges) => {
	localStorage.setItem('edges', JSON.stringify($edges));
});

export const reset = (): void => {
	edges.set([]);
};

const getColorVariables = () => {};

const add = (sourceNode: string, targetNode: string, type: string) => {
	edges.update((currentEdges) => {
		const filteredEdges = currentEdges.filter(
			(edge) => !(edge.source === sourceNode && edge.target === targetNode)
		);

		const newEdge: Edge = {
			id: `${Math.random()}`,
			type,
			source: sourceNode,
			target: targetNode
		};

		return [...filteredEdges, newEdge];
	});

	console.log(get(edges));
};

const init = () => {
	// For testing
	/////
};

const remove = (id: string) => {};
// const get = (id: string) => {};

export const EdgeStore = {
	add,
	init,
	remove
};

// const color = [
// 	{ name: 'primary', variable: '--p' },
// 	{ name: 'primary-content', variable: '--pc' },
// 	{ name: 'secondary', variable: '--s' },
// 	{ name: 'secondary-content', variable: '--sc' },
// 	{ name: 'accent', variable: '--a' },
// 	{ name: 'accent-content', variable: '--ac' },
// 	{ name: 'neutral', variable: '--n' },
// 	{ name: 'neutral-content', variable: '--nc' },
// 	{ name: 'base-100', variable: '--b1' },
// 	{ name: 'base-200', variable: '--b2' },
// 	{ name: 'base-300', variable: '--b3' },
// 	{ name: 'base-content', variable: '--bc' },
// 	{ name: 'info', variable: '--in' },
// 	{ name: 'info-content', variable: '--inc' },
// 	{ name: 'success', variable: '--su' },
// 	{ name: 'success-content', variable: '--suc' },
// 	{ name: 'warning', variable: '--wa' },
// 	{ name: 'warning-content', variable: '--wac' },
// 	{ name: 'error', variable: '--er' },
// 	{ name: 'error-content', variable: '--erc' }
// ];
