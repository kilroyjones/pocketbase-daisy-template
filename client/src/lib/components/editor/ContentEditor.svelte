<script lang="ts">
	// Libraries
	import { useSvelteFlow } from '@xyflow/svelte';

	// Modules
	import { nodes } from '$lib/stores/nodes.store';
	import { showContentEditor } from '$lib/stores/ui.store';

	// Components
	import ChevronLeft from '../icons/ChevronLeft.svelte';
	import ChevronRight from '../icons/ChevronRight.svelte';
	import NodeIconEditor from './nodes/NodeListEditor.svelte';
	import NodeListEditor from './nodes/NodeListEditor.svelte';
	import NodeTextEditor from './nodes/NodeTextEditor.svelte';

	// Types and constants
	import type { NodeUnion } from '$lib/types';

	export let selectedNode: NodeUnion | undefined;

	const { updateNode, updateNodeData } = useSvelteFlow();

	const toggleModal = () => {
		showContentEditor.update((n) => !n);
	};

	const update = (updatedNode: any) => {
		console.log('update', updatedNode);
		//  * updateNode('node-1', (node) => ({ position: { x: node.position.x + 10, y: node.position.y } }));
		updateNode(
			updatedNode.id,
			(node) => ({
				...node, // Spread the existing node to preserve other properties
				position: {
					x: parseFloat(updatedNode.x), // New x coordinate
					y: parseFloat(updatedNode.y) // New y coordinate
				}
			}),
			{ replace: false }
		);
		console.log('update', updatedNode.id, updatedNode.data);
		const res = updateNodeData(updatedNode.id, updatedNode.data, { replace: true });
		console.log(res);
		$nodes = $nodes;
	};
</script>

<div
	class="fixed top-0 right-0 flex h-full pointer-events-none modal-overlay"
	style="width:{showContentEditor ? '400px' : '0px'};"
>
	{$showContentEditor}
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

		{#if $showContentEditor && selectedNode}
			<div class="w-full p-4 pr-10">
				{#if selectedNode.type == 'nodeText'}
					<NodeTextEditor updater={update} node={selectedNode} on:updateFlow></NodeTextEditor>
				{/if}
				{#if selectedNode.type == 'nodeIcon'}
					<NodeIconEditor updater={update} node={selectedNode} on:updateFlow></NodeIconEditor>
				{/if}
				{#if selectedNode.type == 'nodeList'}
					<NodeListEditor updater={update} node={selectedNode} on:updateFlow></NodeListEditor>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.modal-overlay {
		pointer-events: none;
	}
</style>
