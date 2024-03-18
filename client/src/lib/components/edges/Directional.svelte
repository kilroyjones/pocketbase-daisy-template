<script lang="ts">
	// Libraries
	import { getSmoothStepPath, useEdges } from '@xyflow/svelte';

	// Types and constants
	import type { EdgeProps } from '@xyflow/svelte';

	// Components
	import { BaseEdge } from '@xyflow/svelte';

	type $$Props = EdgeProps;

	export let id: $$Props['id'] = '';
	export let type: $$Props['type'] = '';
	export let source: $$Props['source'] = '';
	export let target: $$Props['target'] = '';
	export let animated: $$Props['animated'] = undefined;
	export let selected: $$Props['selected'] = undefined;
	export let label: $$Props['label'] = undefined;
	export let labelStyle: $$Props['labelStyle'] = undefined;
	export let data: $$Props['data'] = undefined;
	export let style: $$Props['style'] = undefined;
	export let markerStart: $$Props['markerStart'] = undefined;
	export let markerEnd: $$Props['markerEnd'] = undefined;
	export let interactionWidth: $$Props['interactionWidth'] = undefined;

	export let sourceX: $$Props['sourceX'];
	export let sourceY: $$Props['sourceY'];
	export let sourcePosition: $$Props['sourcePosition'];
	export let sourceHandleId: $$Props['sourceHandleId'] = undefined;

	export let targetX: $$Props['targetX'];
	export let targetY: $$Props['targetY'];
	export let targetPosition: $$Props['targetPosition'];
	export let targetHandleId: $$Props['targetHandleId'] = undefined;

	const edges = useEdges();

	let isBidirectionalEdge: boolean;
	$: isBidirectionalEdge = $edges.some(
		(e) =>
			(e.source === target && e.target === source) || (e.target === source && e.source === target)
	);

	let path: string;
	$: {
		const edgePathParams = {
			sourceX,
			sourceY,
			sourcePosition,
			targetX,
			targetY,
			targetPosition
		};

		if (isBidirectionalEdge) {
			path = getSpecialPath(edgePathParams, sourceX < targetX ? 25 : -25);
		} else {
			[path] = getSmoothStepPath(edgePathParams);
		}
	}

	function getSpecialPath(
		{
			sourceX,
			sourceY,
			targetX,
			targetY
		}: { sourceX: number; sourceY: number; targetX: number; targetY: number },
		offset: number
	) {
		const centerX = (sourceX + targetX) / 2;
		const centerY = (sourceY + targetY) / 2;

		return `M ${sourceX} ${sourceY} Q ${centerX} ${centerY + offset} ${targetX} ${targetY}`;
	}
</script>

<BaseEdge {path} {markerEnd} />
