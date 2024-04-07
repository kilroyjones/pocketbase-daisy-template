<script lang="ts">
	// Libraries
	import { ConnectionMode, SvelteFlow, useSvelteFlow } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	// Modules
	import { MapStore, edges, nodes, selectedPane } from '$lib/stores/map.store';

	// Components
	import Editor from './editor/Editor.svelte';
	import Tray from './drawer/Tray.svelte';

	// Types and variables
	import type { ComponentType } from 'svelte';
	import type { DefaultEdgeOptions, EdgeTypes, Viewport } from '@xyflow/svelte';
	import type { EdgeUnion, NodeUnion } from '$lib/types';

	import { selectedEdge } from '$lib/stores/map.store';
	import { selectedNode } from '$lib/stores/map.store';

	export let nodeTypes: Record<string, ComponentType>;
	export let edgeTypes: EdgeTypes;
	export let viewport: Viewport;
	export let defaultEdgeOptions: DefaultEdgeOptions;

	const { updateNode, updateNodeData, getEdge, screenToFlowPosition } = useSvelteFlow();

	/**
	 *
	 */
	const updateNodes = (event: CustomEvent<{ node: NodeUnion }>) => {
		const updatedNode = event.detail.node;

		updateNode(
			updatedNode.id,
			(node) => ({
				...node, // Spread the existing node to preserve other properties
				position: {
					x: updatedNode.positionAbsoluteX, // New x coordinate
					y: updatedNode.positionAbsoluteY // New y coordinate
				}
			}),
			{ replace: false }
		);

		updateNodeData(updatedNode.id, updatedNode.data, { replace: false });
	};

	/**
	 *
	 */
	const updateEdges = (event: CustomEvent<{ edge: EdgeUnion }>) => {
		console.log('EVENT', event);
		const toUpdateEdge = getEdge(event.detail.edge.id);
		console.log('TEST', toUpdateEdge);
		if (toUpdateEdge) {
			toUpdateEdge.style = `stroke-width: 2; stroke: oklch(var(${event.detail.edge.data.color}));`;
			edges.update((currentEdges) => {
				const filteredEdges = currentEdges.filter((e) => e.id != toUpdateEdge.id);
				return [...filteredEdges, toUpdateEdge];
			});
			$edges = $edges;
			MapStore.save();
		}
	};

	/**
	 *
	 */
	const onDragOver = (event: DragEvent) => {
		event.preventDefault();

		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
	};

	/**
	 *
	 */
	const onDrop = (event: DragEvent) => {
		event.preventDefault();

		if (!event.dataTransfer) {
			return null;
		}

		const type = event.dataTransfer.getData('application/svelteflow');
		const position = screenToFlowPosition({
			x: event.clientX,
			y: event.clientY
		});

		MapStore.addNode(type, position);
		$nodes = $nodes;
		console.log($nodes);
	};

	/**
	 *
	 */
	const handleKeypress = (event: KeyboardEvent) => {
		if (event.key == 'Delete') {
			if ($selectedNode) {
				MapStore.removeNode($selectedNode.id);
			}
			if ($selectedEdge) {
				console.log('remove');
				MapStore.removeEdge($selectedEdge.id);
			}
		}
	};
</script>

<!--
  👇 By default, the Svelte Flow container has a height of 100%.
  This means that the parent container needs a height to render the flow.

  TODO: Typew the nodeclick and such 
  -->

<svelte:window on:keypress={handleKeypress} />

<div style:height="100vh">
	<SvelteFlow
		connectionMode={ConnectionMode.Loose}
		{nodes}
		{nodeTypes}
		{edges}
		{edgeTypes}
		{defaultEdgeOptions}
		snapGrid={[20, 20]}
		initialViewport={viewport}
		maxZoom={5}
		minZoom={1}
		on:nodeclick={() => {
			MapStore.resetSelection();
		}}
		on:paneclick={() => {
			MapStore.resetSelection();
			$selectedPane = {
				w: 1000,
				h: 1000
			};
		}}
		on:dragstart={(event) => {
			console.log(event);
		}}
		on:dragover={onDragOver}
		on:drop={onDrop}
		class="bg-base-100"
	></SvelteFlow>
	<Editor {selectedEdge} {selectedNode} on:updateNodes={updateNodes} on:updateEdges={updateEdges}
	></Editor>
</div>
