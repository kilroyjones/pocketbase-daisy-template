<script lang="ts">
	// Libraries
	import { onMount, type ComponentType, type EventDispatcher } from 'svelte';
	import { SvelteFlow, useSvelteFlow } from '@xyflow/svelte';

	// Modules
	import { EdgeStore, edges } from '$lib/stores/edges.store';
	import { NodeStore, nodes } from '$lib/stores/nodes.store';

	// Components
	import ContentEditor from './editor/ContentEditor.svelte';
	import Tray from './drawer/Tray.svelte';

	// Types and variables
	import '@xyflow/svelte/dist/style.css';
	import { selectedNode } from '$lib/stores/nodes.store';
	import type { NodeProps, Viewport } from '@xyflow/svelte';
	import { showContentEditor } from '$lib/stores/ui.store';
	import type { NodeBase, NodeUnion } from '$lib/types';

	export let nodeTypes: Record<string, ComponentType>;
	export let edgeTypes: Record<string, ComponentType>;
	export let viewport: Viewport;

	const { screenToFlowPosition } = useSvelteFlow();

	const { updateNode, updateNodeData } = useSvelteFlow();
	/**
	 *
	 */
	//  const loginHandle = function (a: CustomEvent<{username:string, password:string}>) {

	// const updateFlow = (event: CustomEvent<{ node: NodeUnion }>) => {
	const updateFlow = (event: CustomEvent<{ node: NodeUnion }>) => {
		const updatedNode = event.detail.node;
		console.log('Update', updatedNode);

		// updateNode(
		// 	updatedNode.id,
		// 	(node) => ({
		// 		...node, // Spread the existing node to preserve other properties
		// 		position: {
		// 			x: updatedNode.x, // New x coordinate
		// 			y: updatedNode.y // New y coordinate
		// 		}
		// 	}),
		// 	{ replace: false }
		// );

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

		// KEEP: In face the above fails
		// $nodes.forEach((node) => {
		// 	if (node.id === updatedNode.id) {
		// 		node.data = {
		// 			...updatedNode.data
		// 		};
		// 	}
		// });
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
	};

	const handleNodeSelection = (event: CustomEvent) => {
		console.log('handling selection');
		const type = event.detail.node.type;
		if (type) {
			const data = event.detail.node;
			if (data) {
				if ($showContentEditor == false) {
					$showContentEditor = !$showContentEditor;
				}
				// NodeStore.setSelected(data);
			}
		}
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
		initialViewport={viewport}
		maxZoom={5}
		minZoom={1}
		on:nodeclick={(event) => {
			// console.log(event);
			// handleNodeSelection(event);
		}}
		on:dragstart={(event) => {
			console.log(event);
		}}
		on:dragover={onDragOver}
		on:drop={onDrop}
		class="bg-base-100"
	></SvelteFlow>
	<ContentEditor on:updateFlow={updateFlow}></ContentEditor>
	<Tray />
</div>
