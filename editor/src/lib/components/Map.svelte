<script lang="ts">
	// Libraries
	import { onMount, type ComponentType, type EventDispatcher } from 'svelte';
	import { Controls, Panel, SvelteFlow, updateEdge, useSvelteFlow } from '@xyflow/svelte';

	// Modules
	import { EdgeStore, edges } from '$lib/stores/edges.store';
	import { NodeStore, nodes } from '$lib/stores/nodes.store';

	// Components
	import ContentEditor from './editor/ContentEditor.svelte';
	import Tray from './drawer/Tray.svelte';

	import { selectedEdge } from '$lib/stores/edges.store';
	import '@xyflow/svelte/dist/style.css';
	import type { DefaultEdgeOptions, Edge, EdgeTypes, Node, Viewport } from '@xyflow/svelte';
	import type { EdgeUnion, NodeUnion } from '$lib/types';
	import { selectedNode } from '$lib/stores/nodes.store';
	import { updated } from '$app/stores';

	export let nodeTypes: Record<string, ComponentType>;
	export let edgeTypes: EdgeTypes;
	export let viewport: Viewport;

	const { screenToFlowPosition } = useSvelteFlow();
	const { updateNode, updateNodeData } = useSvelteFlow();

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
		const updatedEdge = event.detail.edge;
		let index: number = $edges.findIndex((e) => e.id === updatedEdge.id);
		if (index !== -1) {
			$edges[index] = updatedEdge;
		}
		console.log('here', updatedEdge);
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

		NodeStore.add(type, position);
		$nodes = $nodes;
	};

	onMount(() => {
		NodeStore.init();
		EdgeStore.init();
	});
</script>

<!--
  👇 By default, the Svelte Flow container has a height of 100%.
  This means that the parent container needs a height to render the flow.

  TODO: Typew the nodeclick and such 
  -->
<div style:height="100vh">
	<SvelteFlow
		{nodes}
		{nodeTypes}
		{edges}
		{edgeTypes}
		snapGrid={[20, 20]}
		initialViewport={viewport}
		maxZoom={5}
		minZoom={1}
		on:nodeclick={(event) => {
			console.log(event);
		}}
		on:edgeclick={(event) => {
			console.log('edge:', event);
		}}
		on:dragstart={(event) => {
			console.log(event);
		}}
		on:dragover={onDragOver}
		on:drop={onDrop}
		class="bg-base-100"
		><Controls></Controls>
	</SvelteFlow>
	<ContentEditor
		{selectedEdge}
		{selectedNode}
		on:updateNodes={updateNodes}
		on:updateEdges={updateEdges}
	></ContentEditor>
	<Tray></Tray>
</div>
