<script lang="ts">
	// Libraries
	import { Handle, Position } from '@xyflow/svelte';

	// Modules
	import { NodeStore } from '$lib/stores/nodes.store';

	// Types and constants
	import type { NodeProps } from '@xyflow/svelte';
	import type { NodeList } from '$lib/types';

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

<Handle type="target" position={Position.Left} style="background: #555;" {isConnectable} />

<div
	class="flex justify-center py-1 px-2 border-2 rounded-xl border-{node.data.color
		.border} text-{node.data.color.foreground} bg-{node.data.color.background} align-center"
>
	<div class="text-left">
		<p>{data['text']}</p>
	</div>

	{#each data.items as item}
		<div class="flex flex-col p-0 m-0">
			<label class="p-0 m-0 cursor-pointer">
				<input
					id={item.id}
					type="checkbox"
					checked={item.checked}
					class="w-2.5 h-2.5 mr-2 checkbox checkbox-lg checkbox-accent"
				/>
				<span class="top-0 text-xs">{item.text}</span>
			</label>
		</div>
	{/each}
</div>

<Handle type="source" position={Position.Right} id="b" {isConnectable} />
