<script lang="ts">
	// Libraries
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { SvelteFlow, useSvelteFlow } from '@xyflow/svelte';
	

	// Modules
	import { NodeStore, nodes } from '$lib/stores/nodes.store';
	import { EdgeStore, edges } from '$lib/stores/edges.store';

	// Components
	import ContentEditor from './editor/ContentEditor.svelte';
	import Directional from '$lib/components/edges/Directional.svelte';
	import IconTitleNode from './nodes/IconNode.svelte';
	import ListNode from './nodes/ListNode.svelte';
	import TextNode from '$lib/components/nodes/TextNode.svelte';
	import Tray from './drawer/Tray.svelte';

	// Types and variables
	import '@xyflow/svelte/dist/style.css';
	import { currentSelection, showContentEditor } from '$lib/stores/ui.store';
	import type { FitViewOptions, Viewport } from '@xyflow/svelte';}

	let selectedElement: any;

	const nodeTypes = {
		textNode: TextNode,
		iconNode: IconNode,
		listNode: ListNode
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


	};

	const snapGrid = [25, 25];

	// const closeModal = () => {
	// 	showModal = false;
	// };

	onMount(() => {
		NodeStore.init();
		EdgeStore.init();
	});

	let fit: FitViewOptions = {};
	let viewPort: Viewport = {
		x: 0,
		y: 0,
		zoom: 2
	};
	let r = Array<string>();
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
		initialViewport={viewPort}
		maxZoom={5}
		minZoom={1}
		on:nodeclick={(event) => {
			console.log(event);
			if (get(showContentEditor) == false) {
				showContentEditor.update((n) => !n);
			}

			let temp = event.detail.node.data['items'];
			// let items: Array<string> | undefined;
			// if (Array.isArray(temp)) {
			// 	console.log('asdfasdf');
			// }

			// TODO: Parse based on type
			$currentSelection = {
				id: event.detail.node.id,
				type: event.detail.node.type || '',
				x: event.detail.node.position.x,
				y: event.detail.node.position.y,
				width: event.detail.node?.computed?.width || 0,
				height: event.detail.node?.computed?.height || 0,
				text: event.detail.node.data['text'] || '',
				items: r
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
<ContentEditor selectedElement={$currentSelection}></ContentEditor>
<Tray />
