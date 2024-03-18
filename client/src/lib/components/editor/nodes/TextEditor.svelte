<script lang="ts">
	import type { NodeTitle } from '$lib/types';

	export let node: NodeTitle;
	export let updater: Function;

	// TODO: Add validation for input to check
	const handleInput = () => {
		updater(node);
	};
</script>

<div class="form-control" on:input={handleInput}>
	<form class="form-control">
		<label for="text" class="pb-1 label">
			<span class="text-xs label-text">Text</span>
		</label>
		<input
			type="text"
			placeholder="Your text here"
			bind:value={node.text}
			class="w-full max-w-xs input input-bordered"
		/>
		<div class="divider"></div>
		<div class="flex flex-wrap -mx-2">
			<div class="w-full px-2 mb-4 md:w-1/2">
				<div class="flex items-center">
					<label for="text" class="w-1/5">x:</label>
					<input type="number" bind:value={node.x} class="w-4/5 input input-bordered" />
				</div>
			</div>

			<div class="w-full px-2 mb-4 md:w-1/2">
				<div class="flex items-center">
					<label for="text" class="w-1/5">w:</label>
					<input type="number" bind:value={node.width} class="w-4/5 input input-bordered" />
				</div>
			</div>
		</div>

		<div class="flex flex-wrap -mx-2">
			<div class="w-full px-2 mb-4 md:w-1/2">
				<div class="flex items-center">
					<label for="text" class="w-1/5">y:</label>
					<input type="number" bind:value={node.y} class="w-4/5 input input-bordered" />
				</div>
			</div>

			<div class="w-full px-2 mb-4 md:w-1/2">
				<div class="flex items-center">
					<label for="text" class="w-1/5">h:</label>
					<input type="number" bind:value={node.height} class="w-4/5 input input-bordered" />
				</div>
			</div>
		</div>
	</form>
</div>
