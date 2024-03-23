<script lang="ts">
	// Components
	import { EdgeStore } from '$lib/stores/edges.store';
	import { NodeStore } from '$lib/stores/nodes.store';
	import LoggedIn from './LoggedIn.svelte';
	import LoggedOut from './LoggedOut.svelte';
	import ToggleLightDarkMode from './ToggleLightDarkMode.svelte';

	export let isLoggedIn: boolean = false;

	const reset = () => {
		NodeStore.reset();
		EdgeStore.reset();
	};
</script>

<div class="navbar">
	<div class="flex-1">
		<a href="/" class="text-xl btn btn-ghost">Roadmap Editor</a>
		<div class="flex-none">
			<ToggleLightDarkMode></ToggleLightDarkMode>
		</div>
		<div class="flex-none">
			<button class="btn" on:click={reset}>Reset</button>
		</div>
	</div>
	<div class="flex-none">
		{#if isLoggedIn}
			<LoggedIn></LoggedIn>
		{:else}
			<LoggedOut></LoggedOut>
		{/if}
	</div>
</div>
