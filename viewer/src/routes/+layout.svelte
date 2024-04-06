<script lang="ts">
	// Modules
	import { onMount } from 'svelte';
	import { UserStore, isLoggedIn } from '$lib/stores/user.store';

	// Components
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { ThemeStore } from '$lib/stores/theme.store';

	// Types and constants
	import '../app.css';
	import type { LayoutServerData } from './$types';
	import { NodeStore } from '$lib/stores/nodes.store';
	import { EdgeStore } from '$lib/stores/edges.store';
	import ContentModal from '$lib/components/content/ContentModal.svelte';
	import { showContent } from '$lib/stores/ui.store';

	export let data: LayoutServerData;

	onMount(async () => {
		ThemeStore.initialize();
		const response = await fetch('/roadmaps/test.json');
		if (response.ok) {
			const data: any = await response.json();
			NodeStore.init(data.nodes);
			EdgeStore.init(data.edges);
		} else {
			console.error('Failed to fetch data', response.status);
		}
	});

	$: UserStore.setState(data.user);
</script>

<Navbar isLoggedIn={$isLoggedIn}></Navbar>
{#if $showContent}
	<ContentModal></ContentModal>
{/if}
<slot />
