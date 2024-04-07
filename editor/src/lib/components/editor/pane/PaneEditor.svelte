<script lang="ts">
	import type { Pane } from '$lib/types';
	import ColorPicker from '../ColorPicker.svelte';
	import Collapsible from '$lib/components/utilities/Collapsible.svelte';
	import { createEventDispatcher } from 'svelte';
	import { selectedPane } from '$lib/stores/map.store';

	const dispatch = createEventDispatcher<{ updatePane: { pane: Pane } }>();

	const handleUpdate = () => {
		// dispatch('updatePane', {});
	};

	const handleColor = (type: string, color: string) => {
		// switch (type) {
		// 	case 'foreground':
		// 		node.data.color.foreground = color;
		// 		break;
		// 	case 'background':
		// 		node.data.color.background = color;
		// 		break;
		// 	case 'border':
		// 		node.data.color.border = color;
		// 		break;
		// }
		handleUpdate();
	};

	$: pane = $selectedPane as Pane;
</script>

<div class="form-control" on:input={handleUpdate}>
	<Collapsible on:toggle={({ detail }) => console.log('Collapsible state:', detail.isOpen)}>
		<span slot="title">Basics</span>

		<input class="w-full mb-4 input input-bordered" type="text" placeholder="Project title" />
	</Collapsible>
</div>
