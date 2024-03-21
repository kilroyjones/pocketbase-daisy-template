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

	export let data: LayoutServerData;

	onMount(() => {
		ThemeStore.initialize();
	});

	$: UserStore.setState(data.user);
</script>

<Navbar isLoggedIn={$isLoggedIn}></Navbar>
<slot />
