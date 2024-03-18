<script lang="ts">
	// Libraries
	import { useSvelteFlow } from '@xyflow/svelte';

	// Modules
	import { showContentEditor } from '$lib/stores/ui.store';

	// Components
	import ChevronLeft from '../icons/ChevronLeft.svelte';
	import ChevronRight from '../icons/ChevronRight.svelte';
	import TitleEditor from './nodes/TextEditor.svelte';

	// Types and constants
	import type { NodeTitle } from '$lib/types';
	import IconTitleEditor from './nodes/IconEditor.svelte';

	export let selectedElement: NodeTitle | undefined;

	let nodeType = 'Title node';

	const { updateNode, updateNodeData } = useSvelteFlow();
	const toggleModal = () => {
		showContentEditor.update((n) => !n);
	};

	const update = (data: any) => {
		console.log(data);
		//  * updateNode('node-1', (node) => ({ position: { x: node.position.x + 10, y: node.position.y } }));
		updateNode(
			data.id,
			(node) => ({
				...node, // Spread the existing node to preserve other properties
				position: {
					x: parseFloat(data.x), // New x coordinate
					y: parseFloat(data.y) // New y coordinate
				}
			}),
			{ replace: false }
		);
		updateNodeData(data.id, data);
	};
</script>

<div
	class="modal-overlay fixed top-0 right-0 w-[{$showContentEditor
		? 300
		: 0}px] h-full flex pointer-events-none"
>
	<div
		class="relative flex flex-col w-full pointer-events-auto bg-neutral"
		style="top: 100px; min-height: 400px;"
	>
		<button
			class="absolute z-10 p-2 translate-y-0 bg-accent text-neutral rounded-l-md focus:outline-none -left-10"
			on:click={toggleModal}
			style="transform: translateY(100px);"
		>
			{#if $showContentEditor}
				<ChevronRight></ChevronRight>
			{:else}
				<ChevronLeft></ChevronLeft>
			{/if}
		</button>

		{#if $showContentEditor && selectedElement}
			<div class="w-full max-w-xs p-4">
				<label for="type" class="pb-1 mt-2 label">
					<span class="text-xs label-text">Type</span>
				</label>
				<select class="w-full max-w-xs mt-2 select">
					<option disabled selected>{nodeType}</option>
					<option>Other types</option>
				</select>
				<div class="divider"></div>
				{#if selectedElement.type == 'titleNode'}
					<TitleEditor updater={update} node={selectedElement}></TitleEditor>
				{/if}
				{#if selectedElement.type == 'iconTitleNode'}
					<IconTitleEditor updater={update} node={selectedElement}></IconTitleEditor>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.modal-overlay {
		/* Allow clicks through */
		pointer-events: none;
	}
	.modal-content,
	.close-button {
		/* Enable clicks on content and button */
		pointer-events: auto;
	}
</style>
