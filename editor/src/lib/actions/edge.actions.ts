import { useSvelteFlow } from '@xyflow/svelte';
import { EdgeStore } from '$lib/stores/edges.store';

export const handleEdgeConnect = (params: any) => {
	const { getNode } = useSvelteFlow();
	console.log(params);
	const sourceNode = getNode(params[0].source);
	const targetNode = getNode(params[0].target);

	console.log(sourceNode, targetNode);
	if (sourceNode && targetNode) {
		EdgeStore.add(sourceNode.id, targetNode.id, 'straight');
	}
};
