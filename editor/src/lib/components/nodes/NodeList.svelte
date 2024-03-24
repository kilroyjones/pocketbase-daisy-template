<script lang="ts">
	// Libraries
	import { Handle, Position } from '@xyflow/svelte';

	// Modules
	import { NodeStore } from '$lib/stores/nodes.store';

	// Types and constants
	import type { NodeProps } from '@xyflow/svelte';
	import type { NodeList } from '$lib/types';
	import { handleEdgeConnect } from '$lib/actions/edge.actions';

	export let isConnectable: NodeProps['isConnectable'];
	export let data: NodeList['data'];
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
	} satisfies NodeList;

	const select = () => {
		if (node.selected) {
			NodeStore.update(node);
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
	class="flex flex-col justify-center py-2 px-3 border-2 rounded-xl border-{node.data.color
		.border} text-{node.data.color.foreground}   bg-{node.data.color.background} align-center"
>
	<div class="text-left">
		<p>{data['text']}</p>
	</div>

	{#each data.items as item}
		<div class="flex flex-col p-0 m-0">
			<label class="flex items-center pt-1 m-0 cursor-pointer">
				<input id={item.id} type="checkbox" checked={item.checked} class="w-3 h-3 mr-1 checkbox" />
				<span class="top-0 text-xs">{item.text}</span>
			</label>
		</div>
	{/each}
</div>
