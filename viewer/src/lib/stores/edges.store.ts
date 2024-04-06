import { type Writable, writable } from 'svelte/store';
import { get } from 'svelte/store';
import type { Edge } from '@xyflow/svelte';

const loadInitialEdges = (): Edge[] => {
	const edges = localStorage.getItem('edges');
	return edges ? JSON.parse(edges) : [];
};

export const edges: Writable<Array<Edge>> = writable(loadInitialEdges());
export const selectedEdge: Writable<Edge | undefined> = writable(undefined);

export const reset = (): void => {
	localStorage.setItem('edges', '');
	edges.set([]);
};

export const save = () => {
	localStorage.setItem('edges', JSON.stringify(get(edges)));
};

// const getColorVariables = () => {};

const add = (
	sourceNode: string,
	targetNode: string,
	sourceHandle: string,
	targetHardle: string,
	type: string
) => {
	edges.update((currentEdges) => {
		const filteredEdges = currentEdges.filter(
			(edge) => !(edge.source === sourceNode && edge.target === targetNode)
		);

		const newEdge: Edge = {
			id: `${Math.random()}`,
			type,
			source: sourceNode,
			target: targetNode,
			sourceHandle: sourceHandle,
			targetHandle: targetHardle,
			data: {
				width: 3,
				color: 'base-300'
			},
			style: `stroke-width: 2; stroke: oklch(var(--b3}))`
		};
		save();
		return [...filteredEdges, newEdge];
	});

	console.log(get(edges));
};

const update = () => {
	save();
};

const init = (initialEdges: Array<Edge> | undefined) => {
	// Fix this setup
	if (initialEdges) {
		localStorage.setItem('edges', JSON.stringify(initialEdges));
		const loaded = loadInitialEdges();
	} else {
		const loaded = loadInitialEdges();
		edges.set(loaded);
	}
};

const remove = (id: string) => {
	edges.update((currentEdges) => {
		const filteredEdges = currentEdges.filter((e) => e.id != id);
		return [...filteredEdges];
	});
	save();
};
// const get = (id: string) => {};

export const EdgeStore = {
	add,
	init,
	remove,
	reset,
	save
};
