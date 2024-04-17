<script lang="ts">
	import { writable } from 'svelte/store';

	export let handleColor: Function;
	export let type: string;

	const colors = [
		'secondary-content',
		'primary',
		'secondary',
		'base-100',
		'info',
		'success',
		'error'
	];

	const selectedColor = writable(colors[0]);

	function selectColor(color: string) {
		console.log('selected');
		selectedColor.set(color);
		handleColor(type, color);
	}
</script>

<div class="flex justify-between w-full gap-2">
	{#each colors as color}
		<button
			class="color-box class:border-2 class:border-transparent border-white bg-{color}"
			style="background-color: bg-primary;"
			on:click={() => selectColor(color)}
		>
			{#if $selectedColor === color}
				<div class="w-full h-full border-2 border-black rounded-full"></div>
			{/if}
		</button>
	{/each}
</div>

<style>
	.color-box {
		width: 36px;
		height: 24px;
		border-radius: 9999px;
	}
</style>
