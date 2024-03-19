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

<div class="border-2 rounded-div border-accent">
	<div class="mr-2">
		<img class="object-cover rounded-md" src="https://placehold.co/24x24" alt="placeholder" />
	</div>
	<!-- Text on the right -->
	<div class="flex-grow">
		<p>{data['text']}</p>
	</div>
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
		padding: 6px 10px 6px 10px;
	}
</style>
