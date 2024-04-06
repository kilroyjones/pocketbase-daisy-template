<script lang="ts">
	// Libraries
	import '@xyflow/svelte/dist/style.css';
	import { onMount, type ComponentType } from 'svelte';
	import { ConnectionMode, Controls, SvelteFlow, Panel } from '@xyflow/svelte';

	// Modules
	import { EdgeStore, edges, selectedEdge } from '$lib/stores/edges.store';
	import { NodeStore, nodes, selectedNode } from '$lib/stores/nodes.store';

	// Types and variables
	import type { DefaultEdgeOptions, EdgeTypes, Node, Viewport } from '@xyflow/svelte';
	import ContentModal from './content/ContentModal.svelte';
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

	onMount(() => {
		NodeStore.init(undefined);
		EdgeStore.init(undefined);
	});

	function run() {
		console.log('sdf');
	}

	$: $nodes, run();
</script>

<!--
  👇 By default, the Svelte Flow container has a height of 100%.
  This means that the parent container needs a height to render the flow.
  
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
		><Controls></Controls>
	</SvelteFlow>
</div>
