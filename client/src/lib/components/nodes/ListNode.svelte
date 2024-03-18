<script lang="ts">
	// Libraries
	import { Handle, Position } from '@xyflow/svelte';

	// Types and constants
	import type { NodeProps } from '@xyflow/svelte';

	type $$Props = NodeProps;

	export let isConnectable: $$Props['isConnectable'];
	export let data: $$Props['data'];

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
</script>

<Handle type="target" position={Position.Left} style="background: #555;" {isConnectable} />

<div class="flex flex-col border-2 rounded-div border-accent">
	<div class="text-left">
		<p>{data['text']}</p>
	</div>

	<div class="flex flex-col p-0 m-0">
		<label class="p-0 m-0 cursor-pointer label">
			<input type="checkbox" class="w-2.5 h-2.5 mr-2 checkbox" />
			<span class="label-text text-[10px]">Option 1</span>
		</label>
	</div>
</div>

<Handle type="source" position={Position.Right} id="b" {isConnectable} />

<style>
	.rounded-div {
		border-radius: 10px;
		font-size: 10px;
		padding: 6px 10px 6px 10px;
	}
</style>
