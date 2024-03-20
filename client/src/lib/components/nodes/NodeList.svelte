<script lang="ts">
	import { NodeStore } from '$lib/stores/nodes.store';
	import type { ListItem } from '$lib/types';

	// Libraries
	import { Handle, Position } from '@xyflow/svelte';

	// Types and constants
	import type { NodeProps } from '@xyflow/svelte';
	import type { NodeList } from '$lib/types';

	type NodeListData = {
		text: string;
		items: Array<ListItem>;
	};

	export let isConnectable: NodeProps['isConnectable'];
	export let data: NodeListData;
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
		console.log('List: ', node.selected);
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
	<div class="text-left">
		<p>{data['text']}</p>
	</div>

	{#each data.items as item}
		<div class="flex flex-col p-0 m-0">
			<label class="p-0 m-0 cursor-pointer label">
				<input
					id={item.id}
					type="checkbox"
					checked={item.checked}
					class="w-2.5 h-2.5 mr-2 checkbox"
				/>
				<span class="label-text text-[10px]">{item.text}</span>
			</label>
		</div>
	{/each}
</div>

<Handle type="source" position={Position.Right} id="b" {isConnectable} />

<style>
	.rounded-div {
		border-radius: 10px;
		font-size: 10px;
		padding: 6px 10px 6px 10px;
	}
</style>
