<script lang="ts">
	import type { NodeUnion, NodeIcon } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { selectedNode } from '$lib/stores/nodes.store';
	import ColorPicker from '../ColorPicker.svelte';

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
		console.log(node.data.color);
		handleUpdate();
	};
	$: node = $selectedNode as NodeIcon;
</script>

<div class="form-control" on:input={handleUpdate}>
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

		<div class="divider"></div>

		<label for="text" class="pb-1 label">
			<span class="text-sm label-text">Foreground</span>
		</label>
		<ColorPicker type="foreground" {handleColor}></ColorPicker>

		<label for="text" class="pb-1 label">
			<span class="text-sm label-text">Background</span>
		</label>
		<ColorPicker type="background" {handleColor}></ColorPicker>

		<label for="text" class="pb-1 label">
			<span class="text-sm label-text">Border</span>
		</label>
		<ColorPicker type="border" {handleColor}></ColorPicker>
	</form>
</div>
