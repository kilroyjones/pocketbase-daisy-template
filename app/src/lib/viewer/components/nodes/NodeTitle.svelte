<script lang="ts">
	// Libraries
	import { Handle, Position } from '@xyflow/svelte';

	// Modules
	import { handleEdgeConnect } from '$lib/editor/actions/edge.actions';

	// Types and variables
	import type { NodeTitle } from '$lib/types';

	import { selectedNode } from '$lib/stores/map.store';

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
		class="w-0.5 h-0.5 opacity-0"
		{isConnectable}
		onconnect={handleEdgeConnect}
	/>
{/each}

<div
	class="flex items-start px-3 py-2 border-2 rounded-xl border-{node.data.color.border} text-{node
		.data.color.foreground}  bg-{node.data.color.background}"
>
	<div class="flex items-center mr-2">
		<img
			class="object-cover w-12 h-12 rounded-md"
			src={node.data.icon ? node.data.icon : 'https://placehold.co/48x48'}
			alt="placeholder"
		/>
	</div>
	<div class="flex flex-col justify-center">
		<h1 class="mb-0 text-xl font-bold">{node.data.title}</h1>
		<div class="text-sm">
			{node.data.description}
		</div>
	</div>
</div>
