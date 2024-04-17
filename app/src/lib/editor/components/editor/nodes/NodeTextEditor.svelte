<script lang="ts">
	// Libraries and modules
	import ColorPicker from '../ColorPicker.svelte';
	import Collapsible from '$lib/editor/components/utilities/Collapsible.svelte';
	import { createEventDispatcher } from 'svelte';
	import { MapStore } from '$lib/stores/map.store';
	import { selectedNode } from '$lib/stores/map.store';

	// Types and variables
	import type { NodeUnion, NodeText } from '$lib/types';

	const dispatch = createEventDispatcher<{ updateNodes: { node: NodeUnion } }>();

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
		handleUpdate();
	};

	$: node = $selectedNode as NodeText;
</script>

<div class="form-control" on:input={handleUpdate}>
	<Collapsible on:toggle={({ detail }) => console.log('Collapsible state:', detail.isOpen)}>
		<span slot="title">Basics</span>

		<input
			class="w-full mb-4 input input-bordered"
			type="text"
			placeholder="Text"
			bind:value={node.data.text}
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
			on:keyup={() => MapStore.save()}
			rows="8"
		/>
	</Collapsible>
</div>
