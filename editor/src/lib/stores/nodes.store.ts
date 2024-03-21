// Libraries
import { get, writable } from 'svelte/store';

// Types and constants
import type { Node, XYPosition } from '@xyflow/svelte';
import type { NodeIcon, NodeText, NodeUnion } from '$lib/types';
import type { Writable } from 'svelte/store';
import type { NodeProps } from '@xyflow/svelte';

const loadInitialNodes = (): Node[] => {
	const nodes = localStorage.getItem('nodes');
	return nodes ? JSON.parse(nodes) : [];
};

export const nodes: Writable<Node[]> = writable([]);

const save = () => {
	localStorage.setItem('nodes', JSON.stringify(get(nodes)));
};

export const reset = (): void => {
	nodes.set([]);
};

// export const selectedNode: Writable<NodeUnion | undefined> =
export const selectedNode: Writable<NodeUnion | undefined> =
	// export const selectedNode: Writable<NodeList | NodeText | NodeIcon | undefined> =
	writable(undefined);
/**
 *
 */
const defaultTextData = {
	text: 'Text'
};

const defaultIconData = {
	text: 'Icon',
	icon: '<insert something here>'
};

const defaultListData = {
	text: 'List',
	items: Array.from([])
};

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
	}
};

/**
 *
 */
const add = (type: string, position: XYPosition) => {
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

			return [...currentNodes, newNode];
		});
	}
};

/**
 *
 */
const init = () => {
	// Fix this setup
	console.log('sadfads');
	const loaded = loadInitialNodes();
	nodes.set(loaded);
	add('nodeText', { x: 60, y: 30 });
};

const remove = (id: string) => {};

const update = (node: NodeUnion) => {
	selectedNode.update(() => {
		return node;
	});
	save();
};

export const NodeStore = {
	add,
	init,
	remove,
	reset,
	update
};
