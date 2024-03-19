// Libraries
import { writable } from 'svelte/store';

// Types and constants
import type { Node, XYPosition } from '@xyflow/svelte';
import type { NodeIcon, NodeText, NodeUnion } from '$lib/types';
import type { Writable } from 'svelte/store';

export const nodes: Writable<Array<Node>> = writable([]);
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
	text: 'Text',
	icon: '<insert something here>'
};

const defaultListData = {
	text: 'Text',
	items: Array.from(['Item 1'])
};

/**
 *
 */
const getDefaultData = (type: string) => {
	switch (type) {
		case 'text':
			return { ...defaultTextData };
		case 'icon':
			return { ...defaultIconData };
		case 'list':
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
				data: defaultTextData,
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
	// For testing
	/////
	nodes.update(() => [
		{
			id: '1',
			type: 'nodeIcon',
			data: { text: 'Icon' },
			position: { x: 0, y: 0 }
		},
		{
			id: '2',
			type: 'nodeText',
			data: { text: 'Text' },
			position: { x: 0, y: 150 }
		},
		{
			id: '3',
			type: 'nodeList',
			data: {
				text: 'List',
				items: [
					{ id: '1', checked: false, text: 'item 1' },
					{ id: '2', checked: true, text: 'item 2' }
				]
			},
			position: { x: 150, y: 10 }
		}
	]);
	/////
};
const remove = (id: string) => {};

/**
 * TODO: Fix this to align Svelteflow's types at somepoint. Hacky right now
 */
const setSelected = (node: any) => {
	selectedNode.update(() => ({
		id: node.id,
		type: node.type,
		x: node.computed.positionAbsolute.x,
		y: node.computed.positionAbsolute.y,
		width: node.computed.width,
		height: node.computed.height,
		data: node.data
	}));
};

export const NodeStore = {
	add,
	init,
	remove,
	setSelected
};

// export type NodeBase = {
// 	id: string;
// 	type: string;
// 	position: Position;
// 	width: number;
// 	height: number;
// };

// export type NodeText = NodeBase & {
// 	data: {
// 		text: string;
// 	};
// };

// export type NodeIcon = NodeBase & {
// 	data: {
// 		text: string;
// 		icon: string;
// 	};
// };

// export type NodeList = NodeBase & {
// 	data: {
// 		text: string;
// 		items: string;
// 	};
// };

// export type NodeUnion = NodeText | NodeList | NodeIcon;
