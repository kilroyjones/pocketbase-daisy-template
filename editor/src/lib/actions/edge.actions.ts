import { useSvelteFlow } from '@xyflow/svelte';
import { EdgeStore } from '$lib/stores/edges.store';

export const handleEdgeConnect = (params: any) => {
	const { getNode } = useSvelteFlow();
	const sourceNode = getNode(params[0].source);
	const targetNode = getNode(params[0].target);

	if (sourceNode && targetNode) {
		EdgeStore.add(sourceNode.id, targetNode.id, 'edgeStep');
	}
};
