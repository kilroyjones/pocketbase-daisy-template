<script lang="ts">
	import { showContent } from '$lib/stores/ui.store';
	import Close from '$lib/viewer/components/icons/Close.svelte';
	import { MapStore, nodes, selectedNode } from '$lib/stores/map.store';
	import type { NodeUnion } from '$lib/types';

	const closeContent = () => {
		$showContent = false;
	};

	const updateStatus = (value: string) => {
		// if ($selectedNode) {
		// 	const updatedNode: any = {
		// 		...$selectedNode,
		// 		data: { ...$selectedNode.data, status: value }
		// 	};
		// 	MapStore.update(updatedNode);
		// }
	};
</script>

<div class="fixed top-0 right-0 z-50 w-1/3 h-full p-3 bg-white shadow-xl">
	<div class="flex items-center justify-between p-4 border-b">
		<div>
			<button
				class="px-4 py-2 mr-2 rounded {$selectedNode && $selectedNode.data.status == 'completed'
					? 'text-base-100 bg-success'
					: 'bg-base-300'}"
				on:click={() => updateStatus('completed')}>Completed</button
			>

			<button
				class="px-4 py-2 mr-2 rounded {$selectedNode && $selectedNode.data.status == 'inProgress'
					? 'bg-warning'
					: 'bg-base-300'}"
				on:click={() => updateStatus('inProgress')}>In Progress</button
			>
		</div>
		<button on:click={closeContent}>
			<Close></Close>
		</button>
	</div>
	<div class="pt-4">
		{#if $selectedNode}
			<div>
				{@html $selectedNode.data.content}
			</div>
		{/if}
	</div>
</div>
