<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	// const dispatch = createEventDispatcher<{ updateNodes: { node: NodeUnion } }>();

	import Remove from '$lib/components/icons/Remove.svelte';
	import type { NodeList, NodeUnion } from '$lib/types';
	import Collapsible from '$lib/components/utilities/Collapsible.svelte';
	import type { NodeProps } from '@xyflow/svelte';
	import { selectedNode } from '$lib/stores/map.store';
	import ColorPicker from '../ColorPicker.svelte';
	const dispatch = createEventDispatcher<{ updateNodes: { node: NodeUnion } }>();

	let toAdd: string = '';

	/**
	 *
	 */
	const addItem = () => {
		const newItem = {
			id: (node.data.items.length + 1).toString(),
			checked: false,
			text: toAdd
		};
		node.data = { ...node.data, items: [...node.data.items, newItem] };
		toAdd = '';
		dispatch('updateNodes', {
			node: node
		});
	};

	/**
	 *
	 */
	const removeItem = (id: string) => {
		const updatedItems = node.data.items.filter((item) => item.id !== id);
		node.data = { ...node.data, items: updatedItems };
		dispatch('updateNodes', {
			node: node
		});
	};

	/**
	 *
	 */
	const handleUpdate = () => {
		dispatch('updateNodes', {
			node: node
		});
	};

	const handleColor = (type: string, color: string) => {
		switch (type) {
			case 'foreground':
				node.data.color.foreground = color;
				break;
			case 'background':
				node.data.color.background = color;
				break;
			case 'border':
				node.data.color.border = color;
				break;
		}
		console.log(node.data.color);
		handleUpdate();
	};

	$: node = $selectedNode as NodeList;
</script>

<div class="form-control" on:input={handleUpdate}>
	<Collapsible on:toggle={({ detail }) => console.log('Collapsible state:', detail.isOpen)}>
		<span slot="title">Basics</span>

		<input
			class="w-full mb-4 input input-bordered"
			type="text"
			placeholder="Text"
			bind:value={node.data.title}
		/>

		<div class="flex gap-5 flex-between">
			<div class="w-1/2">
				<div class="flex items-center">
					<label for="text text-xs" class="w-1/6">x:</label>
					<input
						type="number"
						bind:value={node.positionAbsoluteX}
						class="w-5/6 py-5 input input-bordered input-sm"
					/>
				</div>
			</div>

			<div class="w-1/2">
				<div class="flex items-center">
					<label for="text text-xs" class="w-1/6">y:</label>
					<input
						type="number"
						bind:value={node.positionAbsoluteX}
						class="w-5/6 py-5 input input-bordered input-sm"
					/>
				</div>
			</div>
			<div class="w-1/2"></div>
		</div>
	</Collapsible>

	<Collapsible on:toggle={({ detail }) => console.log('Collapsible state:', detail.isOpen)}>
		<span slot="title">List items</span>
		<div class="flex flex-col">
			<div class="form-control">
				<div class="flex items-center w-full flew-row">
					<input
						type="text text-xs h-10"
						bind:value={toAdd}
						placeholder="Add new item..."
						class="w-5/6 py-5 mr-2 input input-sm"
					/>
					<button on:click={addItem} class="w-1/6 h-10 p-0 btn bg-primary">Add</button>
				</div>
			</div>
		</div>

		{#each node.data.items as { id, text, checked } (id)}
			<div class="flex items-center w-full gap-2 mt-2">
				<input
					type="text"
					class="flex-grow py-5 input input-bordered input-sm"
					{id}
					bind:value={text}
					placeholder="Your text here..."
				/>
				<div
					class="text-secondary-content"
					on:click={() => removeItem(id)}
					role="button"
					tabindex="0"
					on:keydown={() => removeItem(id)}
				>
					<Remove></Remove>
				</div>
			</div>
		{/each}
	</Collapsible>

	<Collapsible on:toggle={({ detail }) => console.log('Collapsible state:', detail.isOpen)}>
		<span slot="title">Colors</span>

		<label for="text" class="pb-1 pl-0 label">
			<span class="text-sm font-bold label-text">Foreground</span>
		</label>
		<ColorPicker type="foreground" {handleColor}></ColorPicker>

		<label for="text" class="pb-1 pl-0 label">
			<span class="text-sm font-bold label-text">Background</span>
		</label>
		<ColorPicker type="background" {handleColor}></ColorPicker>

		<label for="text" class="pb-1 pl-0 label">
			<span class="text-sm font-bold label-text">Border</span>
		</label>
		<ColorPicker type="border" {handleColor}></ColorPicker>
	</Collapsible>

	<Collapsible on:toggle={({ detail }) => console.log('Collapsible state:', detail.isOpen)}>
		<span slot="title">Content</span>
		<textarea
			class="w-full p-2 rounded-md"
			placeholder="Add content"
			bind:value={node.data.content}
			rows="8"
		/>
	</Collapsible>
</div>
