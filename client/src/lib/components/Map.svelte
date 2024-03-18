<script lang="ts">
	// Libraries
	import { onMount } from 'svelte';
	import { SvelteFlow, useSvelteFlow } from '@xyflow/svelte';

	// Modules
	import { NodeStore, nodes } from '$lib/stores/nodes.store';
	import { EdgeStore, edges } from '$lib/stores/edges.store';

	// Components
	import ContentEditor from './editor/ContentEditor.svelte';
	import Directional from '$lib/components/edges/Directional.svelte';
	import TitleNode from '$lib/components/nodes/TitleNode.svelte';
	import Tray from './drawer/Tray.svelte';

	// Types and contants
	import '@xyflow/svelte/dist/style.css';
	import { currentSelection, showContentEditor } from '$lib/stores/ui.store';
	import { get } from 'svelte/store';

	let selectedElement: any;

	const nodeTypes = {
		titleNode: TitleNode
	};

	const edgeTypes = {
		directionalEdge: Directional
	};

	const { screenToFlowPosition } = useSvelteFlow();
	const onDragOver = (event: DragEvent) => {
		event.preventDefault();

		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
	};

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

		const newNode = {
			// TODO: Fix this if possible for typess
			// @ts-ignore
			id: `${Math.random()}`,
			type,
			position,
			data: { label: `${type} node` },
			origin: [0.5, 0.0]
		} satisfies Node;

		console.log(newNode);

		// TODO: Fix this on types
		// @ts-ignore
		$nodes.push(newNode);
		$nodes = $nodes;
		console.log(get(nodes).length);
	};

	const snapGrid = [25, 25];

	// const closeModal = () => {
	// 	showModal = false;
	// };

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
		fitView
		on:nodeclick={(event) => {
			console.log(event);
			if (get(showContentEditor) == false) {
				showContentEditor.update((n) => !n);
			}

			// TODO: Parse based on type
			$currentSelection = {
				id: event.detail.node.id,
				type: event.detail.node.type || '',
				x: event.detail.node.position.x,
				y: event.detail.node.position.y,
				width: event.detail.node?.computed?.width || 0,
				height: event.detail.node?.computed?.height || 0,
				text: event.detail.node.data['text'] || ''
			};
		}}
		on:dragstart={(event) => {
			console.log(event);
		}}
		on:dragover={onDragOver}
		on:drop={onDrop}
		class="bg-base-100"
	></SvelteFlow>
</div>
<Tray />
<ContentEditor selectedElement={$currentSelection}></ContentEditor>
