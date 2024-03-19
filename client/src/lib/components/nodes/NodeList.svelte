<script lang="ts">
	import type { ListItem } from '$lib/types';

	// Libraries
	import { Handle, Position } from '@xyflow/svelte';

	// Types and constants
	import type { NodeProps } from '@xyflow/svelte';

	type $$Props = NodeProps;

	console.log('Updating list');

	export let isConnectable: $$Props['isConnectable'];
	export let data: $$Props['data'];

	let listItems: Array<ListItem> = data['items'] as unknown as Array<ListItem>;

	export let id: $$Props['id'];
	export let type: $$Props['type'];
	export let width: $$Props['width'] = 0;
	export let height: $$Props['width'] = 0;
	export let selected: $$Props['selected'] = false;
	export let dragging: $$Props['dragging'];
	export let dragHandle: $$Props['dragHandle'] = undefined;
	export let positionAbsoluteX: $$Props['positionAbsoluteX'];
	export let positionAbsoluteY: $$Props['positionAbsoluteY'];
	export let sourcePosition: $$Props['sourcePosition'] = Position.Bottom;
	export let targetPosition: $$Props['targetPosition'] = Position.Top;
	export let zIndex: $$Props['zIndex'];

	$: listItems = data['items'] as unknown as Array<ListItem>;
</script>

<Handle type="target" position={Position.Left} style="background: #555;" {isConnectable} />

<div class="flex flex-col border-2 rounded-div border-accent">
	<div class="text-left">
		<p>{data['text']}</p>
	</div>

	{#each listItems as item}
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
	<!-- {#each listItems as item}
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
	{/each} -->
</div>

<Handle type="source" position={Position.Right} id="b" {isConnectable} />

<style>
	.rounded-div {
		border-radius: 10px;
		font-size: 10px;
		padding: 6px 10px 6px 10px;
	}
</style>
