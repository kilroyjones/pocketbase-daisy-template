<script lang="ts">
	// Libraries
	import { Handle, Position } from '@xyflow/svelte';

	// Types and constants
	import type { NodeProps } from '@xyflow/svelte';
	import type { NodeIcon } from '$lib/types';
	import { NodeStore } from '$lib/stores/nodes.store';

	type NodeIconData = {
		text: string;
		icon: string;
	};

	export let isConnectable: NodeProps['isConnectable'];
	export let data: NodeIconData;
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
		console.log(node);
		if (node.selected) {
			NodeStore.update(node);
		}
		console.log('asdfasdf');
	};

	$: node && select();
</script>

<Handle type="target" position={Position.Left} style="background: #555;" {isConnectable} />

<div class="flex justify-center p-2.5 border-2 rounded-lg border-accent align-center">
	<div class="mr-2">
		<img class="object-cover rounded-md" src="https://placehold.co/24x24" alt="placeholder" />
	</div>
	<div class="flex-grow">
		<p>{data['text']}</p>
	</div>
</div>

<Handle type="source" position={Position.Right} id="b" {isConnectable} />
