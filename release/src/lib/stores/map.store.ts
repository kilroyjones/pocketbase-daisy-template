// Libraries
import { get, writable } from 'svelte/store';

// Types and constants
import {
	defaultTextData,
	defaultIconData,
	defaultListData,
	defaultTitleData
} from './default.store';

import type { Edge } from '@xyflow/svelte';
import type { MapData, NodeUnion, Pane } from '$lib/types';
import type { Node, XYPosition } from '@xyflow/svelte';
import type { Writable } from 'svelte/store';

// Stores
export const nodes: Writable<Node[]> = writable([]);
export const selectedNode: Writable<NodeUnion | undefined> = writable(undefined);

export const edges: Writable<Array<Edge>> = writable([]);
export const selectedEdge: Writable<Edge | undefined> = writable(undefined);

export const pane: Writable<Pane> = writable();
export const selectedPane: Writable<Pane | undefined> = writable(undefined);

/**
 *
 */
const getDefaultData = (type: string) => {
	switch (type) {
		case 'nodeText':
			return { ...defaultTextData };
		case 'nodeIcon':
			return { ...defaultIconData };
		case 'nodeList':
			return { ...defaultListData };
		case 'nodeTitle':
			return { ...defaultTitleData };
	}
};

/**
 *
 */
const addNode = (type: string, position: XYPosition) => {
	const defaultData = getDefaultData(type);
	if (defaultData) {
		nodes.update((currentNodes) => {
			const newNode: Node = {
				id: `${Math.random()}`,
				type,
				position,
				data: defaultData,
				origin: [0.5, 0.0]
			};
			selectedNode.set(newNode as unknown as NodeUnion);
			return [...currentNodes, newNode];
		});
	}
	save();
};

/**
 *
 */
const removeNode = (id: string) => {
	nodes.update((currentNodes) => {
		const filteredNodes = currentNodes.filter((e) => e.id != id);
		return [...filteredNodes];
	});
	save();
};

/**
 *
 */
const addEdge = (
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

/**
 *
 */
const removeEdge = (id: string) => {
	edges.update((currentEdges) => {
		const filteredEdges = currentEdges.filter((e) => e.id != id);
		return [...filteredEdges];
	});
	save();
};

/**
 *
 */
const initialize = async (mapData: string | undefined) => {
	if (mapData == undefined) {
		const savedMapData = localStorage.getItem('mapData');

		if (savedMapData) {
			const parsedMapData = JSON.parse(savedMapData);
			nodes.update(() => JSON.parse(parsedMapData.nodes));
			edges.update(() => JSON.parse(parsedMapData.edges));
		}
	} else {
		const result = await fetch('/roadmaps/llm-A7-linear-tree-5.json');
		const mapData: MapData = await result.json();

		if (mapData.nodes || mapData.edges) {
			nodes.update(() => mapData.nodes);
			edges.update(() => mapData.edges);
			MapStore.save();
		}
	}
	save();
};

/**
 *
 */
export const resetMap = (): void => {
	console.log('Reset');
	nodes.set([]);
	edges.set([]);
	localStorage.removeItem('nodes');
	localStorage.removeItem('edges');
	save();
};

/**
 *
 */
const resetSelection = () => {
	selectedNode.set(undefined);
	selectedEdge.set(undefined);
	selectedPane.set(undefined);
};

/**
 *
 */
const load = async (map: string | undefined) => {
	await initialize(map);
};

/**
 *
 */
const save = () => {
	localStorage.setItem(
		'mapData',
		JSON.stringify({
			nodes: JSON.stringify(get(nodes)),
			edges: JSON.stringify(get(edges))
		})
	);
	// TODO: Add in saving to file if need bes
};

export const MapStore = {
	addNode,
	removeNode,

	addEdge,
	removeEdge,

	initialize,
	resetMap,
	resetSelection,

	load,
	save
};
