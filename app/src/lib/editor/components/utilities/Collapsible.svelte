<script lang="ts">
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let backgroundColor: string = 'bg-primary';

	let isOpen = true;

	function toggle() {
		isOpen = !isOpen;
		dispatch('toggle', { isOpen });
	}
</script>

<div
	role="button"
	tabindex="0"
	class="flex items-center justify-between w-full p-4 text-sm font-bold cursor-pointer bg-opacity-30 label-text {backgroundColor}"
	on:click={toggle}
	on:keydown={(e) => {
		if (e.key === 'Enter') toggle();
	}}
>
	<slot name="title">Default Title</slot>
	<span class="transition-transform duration-500 transform arrow open" class:open={isOpen}
		>&#9660;</span
	>
</div>

{#if isOpen}
	<div id="collapsibleContent" class="pt-4 pb-4 pl-4 pr-4" transition:slide>
		<slot>Default content - You can replace this by slotting in custom content.</slot>
	</div>
{/if}

<style>
	.arrow {
		transition: transform 0.3s ease;
	}
	.arrow.open {
		transform: rotate(180deg);
	}
</style>
