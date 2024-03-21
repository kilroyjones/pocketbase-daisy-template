<script lang="ts">
	import { ThemeStore } from '$lib/stores/theme.store';
	import { onMount } from 'svelte';

	const toggleTheme = () => {
		ThemeStore.toggle();
	};
</script>

<div class="flex items-center justify-center p-4">
	<button
		class="relative flex items-center p-1 transition-colors duration-300 ease-in-out bg-gray-700 rounded-full w-14 h-7 dark:bg-gray-800"
		on:click={toggleTheme}
		aria-label="Toggle theme"
	>
		<div
			class="absolute w-5 h-5 duration-300 ease-in-out transform bg-white rounded-full shadow-md toggle-dot"
			class:translate-x-7={$ThemeStore === 'dark'}
		></div>
		<div
			class="absolute flex items-center justify-center w-5 h-5 duration-300 ease-in-out transform"
			class:translate-x-7={$ThemeStore !== 'dark'}
		>
			{#if $ThemeStore === 'light'}
				<div class="text-white dark:text-black moon-icon" />
			{:else}
				<div class="sun-icon" />
			{/if}
		</div>
	</button>
</div>

<style>
	.sun-icon:before {
		content: '\2600'; /* Unicode character for sun */
		font-size: 0.8rem;
		display: block;
		text-align: center;
	}
	.moon-icon:before {
		content: '\1F319'; /* Unicode character for crescent moon */
		color: white !important;
		font-size: 0.8rem;
		display: block;
		text-align: center;
	}
</style>
