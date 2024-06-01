<script lang="ts">
	// Libraries
	import { Handle, Position } from '@xyflow/svelte';

	// Modules
	import { handleEdgeConnect } from '$lib/editor/actions/edge.actions';

	// Types and variables
	import type { NodeProps } from '@xyflow/svelte';
	import type { NodeIcon } from '$lib/types';

	import { MapStore, selectedNode } from '$lib/stores/map.store';

	export let isConnectable: NodeProps['isConnectable'];
	export let data: NodeIcon['data'];
	export let id: NodeProps['id'];
	export let type: NodeProps['type'];
	export let width: NodeProps['width'] = 0;
	export let height: NodeProps['height'] = 0;
	export let selected: NodeProps['selected'] = false;
	export let dragging: NodeProps['dragging'];
	export let dragHandle: NodeProps['dragHandle'] = undefined;
	export let positionAbsoluteX: NodeProps['positionAbsoluteX'];
	export let positionAbsoluteY: NodeProps['positionAbsoluteY'];
	export let sourcePosition: NodeProps['sourcePosition'] = Position.Bottom;
	export let targetPosition: NodeProps['targetPosition'] = Position.Top;
	export let zIndex: NodeProps['zIndex'];

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
	} satisfies NodeIcon;

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
	class="flex justify-center py-2 px-3 border-2 rounded-xl border-{node.data.color
		.border} text-{node.data.color.foreground}     bg-{node.data.color.background} align-center"
>
	<div class="mr-2">
		{#if node.data.icon && node.data.icon != ''}
			<div class="object-cover w-6 h-6 rounded-md">{@html node.data.icon}</div>
		{:else}
			<div class="object-cover w-6 h-6 rounded-md bg-primary">&nbsp;</div>
		{/if}
	</div>
	<div class="flex-grow">
		<p>{data['text']}</p>
	</div>
</div>
