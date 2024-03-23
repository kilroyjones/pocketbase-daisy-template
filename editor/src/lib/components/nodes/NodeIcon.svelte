<script lang="ts">
	// Libraries
	import { Handle, Position } from '@xyflow/svelte';

	// Types and constants
	import type { NodeProps } from '@xyflow/svelte';
	import type { NodeIcon } from '$lib/types';
	import { NodeStore } from '$lib/stores/nodes.store';

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
			NodeStore.update(node);
		}
	};

	$: node && select();
</script>

<Handle type="target" position={Position.Left} style="background: #555;" {isConnectable} />

<div
	class="flex justify-center py-1 px-2 border-2 rounded-xl border-{node.data.color
		.border} text-{node.data.color.foreground} bg-{node.data.color.background} align-center"
>
	<div class="mr-2">
		<img class="object-cover rounded-md" src="https://placehold.co/24x24" alt="placeholder" />
	</div>
	<div class="flex-grow">
		<p>{data['text']}</p>
	</div>
</div>

<Handle type="source" position={Position.Right} id="b" {isConnectable} />
