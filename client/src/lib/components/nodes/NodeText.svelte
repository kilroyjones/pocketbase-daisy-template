<script lang="ts">
	// Libraries
	import { Handle, Position } from '@xyflow/svelte';

	// Types and constants
	import type { NodeProps } from '@xyflow/svelte';
	import type { NodeText } from '$lib/types';
	import { NodeStore } from '$lib/stores/nodes.store';

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
		console.log('Text', node.selected);
		if (node.selected) {
			NodeStore.update(node);
		}
	};

	$: node && select();
</script>

<Handle type="target" position={Position.Left} style="background: #555;" {isConnectable} />

<div
	class="flex flex-col border-2 rounded-div border-accent"
	on:click={select}
	on:keydown={select}
	role="button"
	tabindex="0"
>
	{node.data.text}
</div>

<Handle type="source" position={Position.Right} id="b" {isConnectable} />

<style>
	:root {
		--color-text-accent: theme('colors.accent'); /* Fallback to your accent color */
	}

	.rounded-div {
		border-radius: 10px;
		display: flex;
		font-size: 10px;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 10px 16px 10px 16px;
	}
</style>
