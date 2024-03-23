// Libraries
import { get, writable } from 'svelte/store';

// Types and constants
import type { Node, XYPosition } from '@xyflow/svelte';
import type { NodeUnion } from '$lib/types';
import type { Writable } from 'svelte/store';

const loadInitialNodes = (): Node[] => {
	const nodes = localStorage.getItem('nodes');
	return nodes ? JSON.parse(nodes) : [];
};

export const nodes: Writable<Node[]> = writable([]);

const save = () => {
	localStorage.setItem('nodes', JSON.stringify(get(nodes)));
	console.log('saved');
};

export const reset = (): void => {
	nodes.set([]);
};

export const selectedNode: Writable<NodeUnion | undefined> = writable(undefined);

/**
 *
 */
const defaultColorData = {
	color: {
		foreground: 'primary-content',
		background: 'base-100',
		border: 'primary-content'
	}
};

const defaultTextData = {
	text: 'Text',
	color: { foreground: 'primary-content', background: 'base-100', border: 'base-100' }
};

const defaultIconData = {
	text: 'Icon',
	icon: '<insert something here>',
	color: { foreground: 'base-300', background: 'primary opacity-70', border: 'primary opacity-70' }
};

const defaultListData = {
	text: 'List',
	items: Array.from([]),
	color: {
		foreground: 'base-300',
		background: 'warning opacity-70',
		border: 'warning border-opacity-70'
	}
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
	save();
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
