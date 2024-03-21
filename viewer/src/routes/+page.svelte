<script lang="ts">
	// Libraries
	import { SvelteFlowProvider, type Viewport } from '@xyflow/svelte';

	// Components
	import Map from '$lib/components/Map.svelte';
	import NodeText from '$lib/components/nodes/NodeText.svelte';
	import NodeIcon from '$lib/components/nodes/NodeIcon.svelte';
	import NodeList from '$lib/components/nodes/NodeList.svelte';
	import Directional from '$lib/components/edges/Directional.svelte';

	// Types and constants
	const nodeTypes = {
		nodeIcon: NodeIcon,
		nodeList: NodeList,
		nodeText: NodeText
	};

	const edgeTypes = {
		directionalEdge: Directional
	};

	const viewport: Viewport = {
		x: 0,
		y: 0,
		zoom: 1.4
	};

	const snapGrid = [25, 25];
</script>

<SvelteFlowProvider>
	<Map {nodeTypes} {edgeTypes} {viewport}></Map>
</SvelteFlowProvider>
