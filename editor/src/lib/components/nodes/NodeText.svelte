<script lang="ts">
	// Libraries
	import { Handle, Position } from '@xyflow/svelte';

	// Modules
	import { handleEdgeConnect } from '$lib/actions/edge.actions';
	import { NodeStore } from '$lib/stores/nodes.store';

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
			NodeStore.update(node);
		}
	};

	$: node && select();
</script>

<Handle
	type="target"
	position={Position.Left}
	style="background: #555;"
	class="w-2.5 h-2.5 opacity-30"
	{isConnectable}
	onconnect={handleEdgeConnect}
/>

<div
	class="flex justify-center py-1 px-2 border-2 rounded-xl border-{node.data.color
		.border} text-{node.data.color.foreground} bg-{node.data.color.background} align-center"
>
	{node.data.text}
</div>

<Handle
	type="source"
	class="w-2.5 h-2.5 opacity-30"
	position={Position.Right}
	id="b"
	{isConnectable}
	onconnect={handleEdgeConnect}
/>
