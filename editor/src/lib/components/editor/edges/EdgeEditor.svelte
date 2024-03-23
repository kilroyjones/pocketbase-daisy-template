<script lang="ts">
	import { selectedEdge } from '$lib/stores/edges.store';
	import { createEventDispatcher } from 'svelte';
	import ColorPicker from '../ColorPicker.svelte';
	import type { EdgeStep, EdgeUnion } from '$lib/types';

	const dispatch = createEventDispatcher<{ updateEdges: { edge: EdgeUnion } }>();

	const handleUpdate = () => {
		console.log('updating');
		dispatch('updateEdges', {
			edge: edge
		});
	};

	const colors: Map<string, string> = new Map([
		['primary', '--p'],
		['primary-content', '--pc'],
		['secondary', '--s'],
		['secondary-content', '--sc'],
		['accent', '--a'],
		['accent-content', '--ac'],
		['neutral', '--n'],
		['neutral-content', '--nc'],
		['base-100', '--b1'],
		['base-200', '--b2'],
		['base-300', '--b3'],
		['base-content', '--bc'],
		['info', '--in'],
		['info-content', '--inc'],
		['success', '--su'],
		['success-content', '--suc'],
		['warning', '--wa'],
		['warning-content', '--wac'],
		['error', '--er'],
		['error-content', '--erc']
	]);
	// 'base-100',
	// 'primary-content',
	// 'primary',
	// 'secondary',
	// 'success',
	// 'info',
	// 'warning',
	// 'error'
	const handleColor = (type: string, color: string) => {
		console.log(color);
		const colorVar = colors.get(color);
		console.log(colorVar);
		if (colorVar) {
			console.log(edge);
			edge.style = `stroke: oklch(var(${colorVar}))`;
		}
		handleUpdate();
	};

	$: edge = $selectedEdge as EdgeStep;
</script>

<div class="form-control" on:input={handleUpdate}>
	<form class="form-control">
		<label for="text" class="pb-1 label">
			<span class="text-sm label-text">Style</span>
		</label>
		<label for="text" class="pb-1 label">
			<span class="text-sm label-text">Color</span>
		</label>
		<ColorPicker type="foreground" {handleColor}></ColorPicker>

		<div class="divider"></div>
	</form>
</div>
