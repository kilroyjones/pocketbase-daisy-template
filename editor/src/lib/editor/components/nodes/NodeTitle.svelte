<script lang="ts">
	// Libraries
	import { Handle, Position } from '@xyflow/svelte';

	// Modules
	import { handleEdgeConnect } from '$lib/editor/actions/edge.actions';

	// Types and variables
	import type { NodeTitle } from '$lib/types';

	import { MapStore, selectedNode } from '$lib/stores/map.store';

	export let isConnectable: NodeTitle['isConnectable'];
	export let data: NodeTitle['data'];
	export let id: NodeTitle['id'];
	export let type: NodeTitle['type'];
	export let width: NodeTitle['width'] = 0;
	export let height: NodeTitle['height'] = 0;
	export let selected: NodeTitle['selected'] = false;
	export let dragging: NodeTitle['dragging'];
	export let dragHandle: NodeTitle['dragHandle'] = undefined;
	export let positionAbsoluteX: NodeTitle['positionAbsoluteX'];
	export let positionAbsoluteY: NodeTitle['positionAbsoluteY'];
	export let sourcePosition: NodeTitle['sourcePosition'] = Position.Bottom;
	export let targetPosition: NodeTitle['targetPosition'] = Position.Top;
	export let zIndex: NodeTitle['zIndex'];

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
	} satisfies NodeTitle;

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
		class="w-2.5 h-2.5 opacity-30"
		{isConnectable}
		onconnect={handleEdgeConnect}
	/>
{/each}

<div
	class="flex items-start px-3 py-2 border-2 rounded-xl border-{node.data.color.border} text-{node
		.data.color.foreground}  bg-{node.data.color.background}"
>
	<div class="flex items-center mr-2">
		{#if node.data.icon && node.data.icon != ''}
			<div class="object-cover w-12 h-12 rounded-md">{@html node.data.icon}</div>
		{:else}
			<div class="object-cover w-12 h-12 rounded-md bg-primary">&nbsp;</div>
		{/if}
	</div>
	<div class="flex flex-col justify-center">
		<h1 class="mb-0 text-xl font-bold">{node.data.title}</h1>
		<div class="text-sm">
			{node.data.description}
		</div>
	</div>
</div>
