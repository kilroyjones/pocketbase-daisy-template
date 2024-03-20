<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	// const dispatch = createEventDispatcher<{ updateFlow: { node: NodeUnion } }>();

	import Remove from '$lib/components/icons/Remove.svelte';
	import type { NodeList, NodeUnion } from '$lib/types';
	import type { NodeProps } from '@xyflow/svelte';
	import { selectedNode } from '$lib/stores/nodes.store';
	const dispatch = createEventDispatcher<{ updateFlow: { node: NodeUnion } }>();

	let toAdd: string = '';

	// Function to add an item
	function addItem(): void {
		node.data.items.push({
			id: (node.data.items.length + 1).toString(),
			checked: false,
			text: toAdd
		});
		toAdd = '';
		console.log('dispatch');
		dispatch('updateFlow', {
			node: node
		});
	}

	// Function to remove an item by id
	function removeItem(id: string): void {
		node.data.items = node.data.items.filter((item) => item.id !== id);
		dispatch('updateFlow', {
			node: node
		});
	}

	// TODO: Add validation for input to check
	const handleInput = () => {
		console.log('upper', node);
		dispatch('updateFlow', {
			node: node
		});
	};

	$: node = $selectedNode as NodeList;
</script>

<div class="form-control" on:input={handleInput}>
	<form class="form-control">
		<div class="flex flex-wrap">
			<label for="text" class="pb-1 label">
				<span class="text-xs label-text">Text</span>
			</label>
			<input
				type="text"
				placeholder="Text"
				bind:value={node.data.text}
				class="w-full input input-bordered"
			/>
		</div>

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

		<div class="divider"></div>

		<div class="flex flex-col mt-2">
			<div class="form-control">
				<label for="text text-xs">List items</label>
				<div class="flex items-center w-full flew-row">
					<input
						type="text text-xs h-10"
						bind:value={toAdd}
						placeholder="Add new item..."
						class="w-5/6 mr-2 input"
					/>
					<button on:click={addItem} class="w-1/6 h-10 btn">Add</button>
				</div>
			</div>
		</div>

		{#each node.data.items as { id, text, checked } (id)}
			<div class="flex items-center w-full gap-2 mt-2">
				<input type="checkbox" bind:checked class="flex checkbox checkbox-lg checkbox-accent" />
				<input
					type="text"
					class="flex-grow input input-bordered"
					{id}
					bind:value={text}
					placeholder="Your text here..."
				/>
				<div
					class="text-secondary"
					on:click={() => removeItem(id)}
					role="button"
					tabindex="0"
					on:keydown={() => removeItem(id)}
				>
					<Remove></Remove>
				</div>
			</div>
		{/each}
	</form>
</div>
