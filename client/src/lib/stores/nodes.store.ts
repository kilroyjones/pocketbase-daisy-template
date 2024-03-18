// Libraries
import { writable } from 'svelte/store';

// Types and constants
import type { Node, XYPosition } from '@xyflow/svelte';
import type { Writable } from 'svelte/store';

export const nodes: Writable<Array<Node>> = writable([]);

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

const getDefaultData = (type: string) {
	switch(type) {
		case("text"):
			return {...defaultTextData}
		case("icon"):
			return {...defaultTextData}
		case("list"):
			return {...defaultListData}
	}
}


const add = (type: string, position: XYPosition) => {
	const defaultData = getDefaultData(type)
	if(defaultData) {
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

const init = () => {
	// For testing
	/////
	nodes.update(() => [
		{
			id: '1',
			type: 'iconNode',
			data: { text: 'Icon' },
			position: { x: 0, y: 0 }
		},
		{
			id: '2',
			type: 'textNode',
			data: { text: 'Text' },
			position: { x: 0, y: 150 }
		},
		{
			id: '3',
			type: 'listNode',
			data: { text: 'List', items: ['item 1', 'item 2', 'item 3'] },
			position: { x: 150, y: 10 }
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
