<script lang="ts">
	import { MapStore, selectedNode } from '$lib/stores/map.store';
	import type { NodeUnion, NodeText } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import ColorPicker from '../ColorPicker.svelte';

	let fileInput: HTMLInputElement;

	const dispatch = createEventDispatcher<{ updateNodes: { node: NodeUnion } }>();

	/**
	 *
	 */
	const handleUpdate = () => {
		dispatch('updateNodes', {
			node: node
		});
	};

	/**
	 *
	 */
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

	/**
	 *
	 */
	const handleImageUpload = (event: Event) => {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) {
			console.error('No file selected.');
			return;
		}

		const reader = new FileReader();
		reader.onload = (e: ProgressEvent<FileReader>) => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				const scaleFactor = 512 / img.width;
				canvas.width = 512;
				canvas.height = img.height * scaleFactor;

				ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
				const base64Image = canvas.toDataURL('image/jpeg');
				console.log(base64Image);
				node.data.icon = base64Image;
				handleUpdate();
			};
			img.src = e.target?.result as string;
		};
		reader.readAsDataURL(file);
	};

	/**
	 *
	 */
	const removeImage = () => {
		node.data.icon = '';
		console.log('sdfasdf', node.data.icon);
		handleUpdate();
		MapStore.save();
	};

	$: node = $selectedNode as NodeText;
</script>

<div class="form-control" on:input={handleUpdate}>
	<form class="form-control">
		<label for="text" class="pb-1 label">
			<span class="text-sm label-text">Title</span>
		</label>
		<input
			type="text"
			placeholder="Your text here"
			bind:value={node.data.title}
			class="w-full input input-bordered"
		/>

		<label for="text" class="pb-1 label">
			<span class="text-sm label-text">Description</span>
		</label>
		<input
			type="text"
			placeholder="Your text here"
			bind:value={node.data.description}
			class="w-full mb-4 input input-bordered"
		/>

		<input
			type="file"
			id="imageInput"
			accept="image/*"
			class="hidden"
			bind:this={fileInput}
			on:change={handleImageUpload}
		/>
		{#if node.data.icon != ''}
			<button class="btn btn-error" on:click={removeImage}>Remove image</button>
		{:else}
			<button class="btn btn-primary" on:click={() => fileInput.click()}>Upload Image</button>
		{/if}

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
