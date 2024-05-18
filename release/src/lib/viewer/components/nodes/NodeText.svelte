<script lang="ts">
	// Libraries
	import { Handle, Position } from '@xyflow/svelte';

	// Modules
	import { MapStore, selectedNode } from '$lib/stores/map.store';

	// Types and constants
	import type { NodeText } from '$lib/types';

	export let isConnectable: NodeText['isConnectable'];
	export let data: NodeText['data'];
	export let id: NodeText['id'];
	export let type: NodeText['type'];
	export let width: NodeText['width'] = 0;
	export let height: NodeText['height'] = 0;
	export let selected: NodeText['selected'] = false;
	export let dragging: NodeText['dragging'];
	export let dragHandle: NodeText['dragHandle'] = undefined;
	export let positionAbsoluteX: NodeText['positionAbsoluteX'];
	export let positionAbsoluteY: NodeText['positionAbsoluteY'];
	export let sourcePosition: NodeText['sourcePosition'] = Position.Bottom;
	export let targetPosition: NodeText['targetPosition'] = Position.Top;
	export let zIndex: NodeText['zIndex'];

	const ids = ['a', 'b', 'c', 'd'];
	const positionsAndIds: Array<[Position, string]> = Object.values(Position).map((value, index) => [
		value,
		ids[index]
	]);

	$: node = {
		isConnectable,
		data,
		id,
		type,
		width,
		height,
		selected,
		dragging,
		dragHandle,
		positionAbsoluteX: Math.floor(positionAbsoluteX),
		positionAbsoluteY: Math.floor(positionAbsoluteY),
		sourcePosition,
		targetPosition,
		zIndex
	} satisfies NodeText;

	const select = () => {
		if (node.selected) {
			MapStore.resetSelection();
			$selectedNode = node;
		}
	};

	$: node && select();
</script>

{#each positionsAndIds as [position, id]}
	<Handle
		{id}
		type="source"
		{position}
		style="background: #555;"
		class="w-0 h-0 opacity-0"
		{isConnectable}
	/>
{/each}

<div
	class="flex justify-center py-2 px-3 border-2 rounded-xl border-{node.data.color
		.border} text-{node.data.color.foreground} bg-{node.data.color.background} align-center"
>
	{node.data.text}
</div>
