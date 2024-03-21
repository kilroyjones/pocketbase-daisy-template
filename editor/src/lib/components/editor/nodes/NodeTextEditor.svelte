<script lang="ts">
	import { selectedNode } from '$lib/stores/nodes.store';
	import type { NodeUnion, NodeText } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher<{ updateFlow: { node: NodeUnion } }>();

	const handleInput = () => {
		dispatch('updateFlow', {
			node: node
		});
	};
	$: node = $selectedNode as NodeText;
</script>

<div class="form-control" on:input={handleInput}>
	<form class="form-control">
		<label for="text" class="pb-1 label">
			<span class="text-xs label-text">Text</span>
		</label>
		<input
			type="text"
			placeholder="Your text here"
			bind:value={node.data.text}
			class="w-full max-w-xs input input-bordered"
		/>

		<div class="divider"></div>

		<div class="flex gap-5 mt-3 flex-between">
			<div class="w-1/2">
				<div class="flex items-center">
					<label for="text text-xs" class="w-1/6">x:</label>
					<input
						type="number"
						bind:value={node.positionAbsoluteX}
						class="w-5/6 input input-bordered"
					/>
				</div>
			</div>

			<div class="w-1/2">
				<div class="flex items-center">
					<label for="text text-xs" class="w-1/6">y:</label>
					<input
						type="number"
						bind:value={node.positionAbsoluteX}
						class="w-5/6 input input-bordered"
					/>
				</div>
			</div>
		</div>
	</form>
</div>
