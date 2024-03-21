import { type Writable, writable } from 'svelte/store';
import type { Edge } from '@xyflow/svelte';

const loadInitialEdges = (): Edge[] => {
	const edges = localStorage.getItem('edges');
	return edges ? JSON.parse(edges) : [];
};

export const edges: Writable<Array<Edge>> = writable(loadInitialEdges());

edges.subscribe(($edges) => {
	localStorage.setItem('edges', JSON.stringify($edges));
});

export const reset = (): void => {
	edges.set([]);
};

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
};

const init = () => {
	// For testing
	/////
};

const remove = (id: string) => {};
const get = (id: string) => {};

export const EdgeStore = {
	add,
	init,
	remove
};
