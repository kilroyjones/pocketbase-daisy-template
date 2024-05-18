<script lang="ts">
	// Libraries
	import { getBezierPath, getSmoothStepPath } from '@xyflow/svelte';

	// Modules
	import { edges, selectedEdge } from '$lib/stores/map.store';

	// Components
	import { BaseEdge } from '@xyflow/svelte';

	// Types and constants
	import type { EdgeProps } from '@xyflow/svelte';
	import type { EdgeSmooth } from '$lib/types';
	import { selectedNode } from '$lib/stores/map.store';

	export let id: string;
	export let type: string = 'smoothStep';
	export let source: string;
	export let target: string;
	export let sourceX: EdgeProps['sourceX'];
	export let targetX: EdgeProps['targetX'];
	export let targetY: EdgeProps['targetY'];
	export let sourceY: EdgeProps['sourceY'];
	export let targetPosition: EdgeProps['targetPosition'];
	export let sourcePosition: EdgeProps['sourcePosition'];
	export let sourceHandleId: EdgeProps['sourceHandleId'] = undefined;
	export let targetHandleId: EdgeProps['targetHandleId'] = undefined;
	export let animated: EdgeProps['animated'] = undefined;
	export let selected: EdgeProps['selected'] = undefined;
	export let label: EdgeProps['label'] = undefined;
	export let labelStyle: EdgeProps['labelStyle'] = undefined;
	export let data: EdgeProps['data'] = undefined;
	export let style: EdgeProps['style'] = undefined;
	export let markerStart: EdgeProps['markerStart'] = undefined;
	export let markerEnd: EdgeProps['markerEnd'] = undefined;
	export let interactionWidth: EdgeProps['interactionWidth'] = undefined;

	let isBidirectionalEdge: boolean;
	let path: string;

	/**
	 *
	 */
	const getSpecialPath = (
		{
			sourceX,
			sourceY,
			targetX,
			targetY
		}: { sourceX: number; sourceY: number; targetX: number; targetY: number },
		offset: number
	) => {
		const centerX = (sourceX + targetX) * 20;
		const centerY = (sourceY + targetY) / 2;

		return `M ${sourceX} ${sourceY} Q ${centerX} ${centerY + offset} ${targetX} ${targetY}`;
	};

	/**
	 *
	 */
	const select = () => {
		if (edge.selected) {
			$selectedNode = undefined;
			$selectedEdge = edge;
		}
	};

	$: edge = {
		id,
		type,
		source,
		target,
		animated,
		selected,
		label,
		labelStyle,
		data,
		style,
		markerStart,
		markerEnd,
		interactionWidth,
		sourceX,
		sourceY,
		sourcePosition,
		sourceHandleId,
		targetX,
		targetY,
		targetPosition,
		targetHandleId
	} satisfies EdgeSmooth;

	/**
	 *
	 */
	$: isBidirectionalEdge = $edges.some(
		(e) =>
			(e.source === target && e.target === source) || (e.target === source && e.source === target)
	);

	/**
	 *
	 */
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
			// [path] = getBezierPath(edgePathParams);
			[path] = getSmoothStepPath(edgePathParams);
		}
	}

	$: edge && select();
</script>

<BaseEdge {path} {style} {markerEnd} />
