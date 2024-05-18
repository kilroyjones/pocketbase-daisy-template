<script lang="ts">
	// Libraries and modules
	import Collapsible from '$lib/editor/components/utilities/Collapsible.svelte';
	import ColorPicker from '../ColorPicker.svelte';
	import { createEventDispatcher } from 'svelte';
	import { MapStore, selectedNode } from '$lib/stores/map.store';

	// Types and variables
	import type { NodeUnion, NodeIcon } from '$lib/types';

	let fileInput: HTMLInputElement;

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

				if (ctx) {
					ctx.fillStyle = 'rgba(0,0,0,0)'; // Transparent background
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
					const base64Image = canvas.toDataURL('image/png');
					console.log(base64Image);
					node.data.icon = base64Image;
					handleUpdate();
				}
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

	$: node = $selectedNode as NodeIcon;
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

		<input
			type="file"
			id="imageInput"
			accept="image/*"
			class="hidden"
			bind:this={fileInput}
			on:change={handleImageUpload}
		/>

		<input
			type="file"
			id="imageInput"
			accept="image/*"
			class="hidden"
			bind:this={fileInput}
			on:change={handleImageUpload}
		/>

		<div class="flex gap-5 flex-between">
			{#if node.data.icon != ''}
				<button class="btn btn-error" on:click={removeImage}>Remove image</button>
			{:else}
				<button class="btn btn-primary" on:click={() => fileInput.click()}>Upload Image</button>
			{/if}

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
						bind:value={node.positionAbsoluteY}
						class="w-5/6 input input-bordered"
					/>
				</div>
			</div>
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
