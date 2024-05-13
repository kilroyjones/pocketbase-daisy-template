<script lang="ts">
	// Libraries and modules
	import { Controls, MiniMap, ConnectionMode, SvelteFlow } from '@xyflow/svelte';
	import { edges, nodes } from '$lib/stores/map.store';
	import '@xyflow/svelte/dist/style.css';

	// Types and variables
	import type { ComponentType } from 'svelte';
	import type { DefaultEdgeOptions, EdgeTypes, Viewport } from '@xyflow/svelte';

	// Components
	import { selectedNode } from '$lib/stores/map.store';
	import { showContent } from '$lib/stores/ui.store';

	export let nodeTypes: Record<string, ComponentType>;
	export let edgeTypes: EdgeTypes;
	export let viewport: Viewport;
	export let defaultEdgeOptions: DefaultEdgeOptions;

	/**
	 *
	 */
	const handleNodeClick = (event: CustomEvent) => {
		console.log(event);
		const node = event.detail.node;
		if (node) {
			if ($showContent == false) {
				$showContent = !$showContent;
			}

			selectedNode.set(node);
		}
	};
</script>

<!--
  👇 By default, the Svelte Flow container has a height of 100%.
  This means that the parent container needs a height to render the flow.

  TODO: Typew the nodeclick and such 
  -->

<div style:height="100vh">
	<SvelteFlow
		connectionMode={ConnectionMode.Loose}
		{nodes}
		{nodeTypes}
		{edges}
		{edgeTypes}
		{defaultEdgeOptions}
		on:nodeclick={handleNodeClick}
		preventScrolling={false}
		zoomOnDoubleClick={false}
		zoomOnScroll={false}
		snapGrid={[20, 20]}
		initialViewport={viewport}
		maxZoom={5}
		minZoom={1}
	></SvelteFlow>
	<Controls />
</div>
