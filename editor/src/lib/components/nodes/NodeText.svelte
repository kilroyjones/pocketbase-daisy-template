<script lang="ts">
	// Libraries
	import { Handle, Position } from '@xyflow/svelte';

	// Types and constants
	import type { NodeProps } from '@xyflow/svelte';
	import type { NodeText } from '$lib/types';
	import { NodeStore } from '$lib/stores/nodes.store';
	import { showContentEditor } from '$lib/stores/ui.store';
	import { handleEdgeConnect } from '$lib/actions/edge.actions';

	type NodeTextData = {
		text: string;
	};

	export let isConnectable: NodeProps['isConnectable'];
	export let data: NodeTextData;
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

<div class="flex justify-center p-2.5 border-2 rounded-lg border-accent align-center">
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
