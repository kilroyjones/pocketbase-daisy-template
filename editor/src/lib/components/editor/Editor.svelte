<script lang="ts">
	import { selectedPane } from '$lib/stores/map.store';

	// Modules
	import { showEditor } from '$lib/stores/ui.store';

	// Components
	import ChevronLeft from '../icons/ChevronLeft.svelte';
	import ChevronRight from '../icons/ChevronRight.svelte';
	import EdgeEditor from './edges/EdgeEditor.svelte';
	import NodeIconEditor from './nodes/NodeIconEditor.svelte';
	import NodeListEditor from './nodes/NodeListEditor.svelte';
	import NodeTextEditor from './nodes/NodeTextEditor.svelte';
	import NodeTitleEditor from './nodes/NodeTitleEditor.svelte';
	import PaneEditor from './pane/PaneEditor.svelte';

	export let selectedNode: any;
	export let selectedEdge: any;

	const toggleModal = () => {
		showEditor.update((n) => !n);
	};
</script>

<div
	class="absolute top-0 right-0 flex h-full pointer-events-none"
	style="width:{$showEditor ? '400px' : '0px'};"
>
	<div class="relative flex flex-col w-full pointer-events-auto bg-base-200" style="top: 68px;">
		<button
			class="absolute z-10 p-2 translate-y-0 bg-accent text-neutral rounded-l-md focus:outline-none -left-10"
			on:click={toggleModal}
			style="transform: translateY(100px);"
		>
			{#if $showEditor}
				<ChevronRight></ChevronRight>
			{:else}
				<ChevronLeft></ChevronLeft>
			{/if}
		</button>

		{#if $showEditor}
			<div class="w-full">
				{#if $selectedNode}
					{#if $selectedNode?.type === 'nodeText'}
						<NodeTextEditor on:updateNodes></NodeTextEditor>
					{/if}

					{#if $selectedNode?.type == 'nodeIcon'}
						<NodeIconEditor on:updateNodes></NodeIconEditor>
					{/if}

					{#if $selectedNode?.type == 'nodeList'}
						<NodeListEditor on:updateNodes></NodeListEditor>
					{/if}

					{#if $selectedNode?.type == 'nodeTitle'}
						<NodeTitleEditor on:updateNodes></NodeTitleEditor>
					{/if}
				{/if}

				{#if $selectedEdge}
					<EdgeEditor on:updateEdges></EdgeEditor>
				{/if}

				{#if $selectedPane}
					<PaneEditor on:updatePane></PaneEditor>
				{/if}
			</div>
		{/if}
	</div>
</div>
