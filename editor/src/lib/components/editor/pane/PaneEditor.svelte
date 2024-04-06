<script lang="ts">
	import type { Pane } from '$lib/types';
	import ColorPicker from '../ColorPicker.svelte';
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
	<form class="form-control">
		<label for="text" class="pb-1 label">
			<span class="text-sm label-text">Project title</span>
		</label>
		<input type="text" placeholder="Your text here" class="w-full max-w-xs input input-bordered" />

		<div class="flex gap-5 mt-3 flex-between">
			<div class="w-1/2">
				<div class="flex items-center">
					<label for="text text-xs" class="w-1/6">w:</label>
					<input type="number" class="w-5/6 input input-bordered" />
				</div>
			</div>

			<div class="w-1/2">
				<div class="flex items-center">
					<label for="text text-xs" class="w-1/6">y:</label>
					<input type="number" class="w-5/6 input input-bordered" />
				</div>
			</div>
		</div>
	</form>
</div>
