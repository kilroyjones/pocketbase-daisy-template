<script lang="ts">
	// Libraries
	import { SvelteFlowProvider, type DefaultEdgeOptions, type Viewport } from '@xyflow/svelte';

	// Components
	import Map from '$lib/viewer/components//Map.svelte';
	import NodeText from '$lib/viewer/components/nodes/NodeText.svelte';
	import NodeIcon from '$lib/viewer/components/nodes/NodeIcon.svelte';
	import NodeList from '$lib/viewer/components/nodes/NodeList.svelte';
	import EdgeSmooth from '$lib/viewer/components/edges/EdgeSmooth.svelte';
	import NodeTitle from '$lib/viewer/components/nodes/NodeTitle.svelte';
	import { MapStore } from '$lib/stores/map.store';

	// Types and constants
	const nodeTypes = {
		nodeIcon: NodeIcon,
		nodeList: NodeList,
		nodeText: NodeText,
		nodeTitle: NodeTitle
	};

	const edgeTypes = {
		EdgeSmooth: EdgeSmooth
	};

	const viewport: Viewport = {
		x: 0,
		y: 0,
		zoom: 1.2
	};

	const defaultEdgeOptions: DefaultEdgeOptions = {
		type: 'EdgeSmooth'
	};

	// TODO: This is hacky, but refreshes on change, so figure out a better way
	MapStore.load();
</script>

<SvelteFlowProvider>
	<Map {nodeTypes} {defaultEdgeOptions} {edgeTypes} {viewport}></Map>
</SvelteFlowProvider>
