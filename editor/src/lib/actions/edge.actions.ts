import { useSvelteFlow } from '@xyflow/svelte';
import { EdgeStore } from '$lib/stores/edges.store';

export const handleEdgeConnect = (params: any) => {
	const { getNode } = useSvelteFlow();
	console.log('Params', params);
	const sourceNode = getNode(params[0].source);
	const targetNode = getNode(params[0].target);
	const sourceHandle = params[0].sourceHandle;
	const targetHandle = params[0].targetHandle;
	console.log(sourceNode, '-', targetNode, sourceHandle, targetHandle);

	if (sourceNode && targetNode && sourceHandle && targetHandle) {
		EdgeStore.add(sourceNode.id, targetNode.id, sourceHandle, targetHandle, 'edgeStep');
	}
};
