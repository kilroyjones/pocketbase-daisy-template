import { useSvelteFlow } from '@xyflow/svelte';
import { MapStore } from '$lib/stores/map.store';

export const handleEdgeConnect = (params: any) => {
	const { getNode } = useSvelteFlow();
	const sourceNode = getNode(params[0].source);
	const targetNode = getNode(params[0].target);
	const sourceHandle = params[0].sourceHandle;
	const targetHandle = params[0].targetHandle;

	if (sourceNode && targetNode && sourceHandle && targetHandle) {
		MapStore.addEdge(sourceNode.id, targetNode.id, sourceHandle, targetHandle, 'EdgeSmooth');
	}
};
