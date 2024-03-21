<script lang="ts">
	// Modules
	import { UserStore, isLoggedIn } from '$lib/stores/user.store';

	// Components
	import Navbar from '$lib/components/navbar/Navbar.svelte';

	// Types and constants
	import '../app.css';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	$: UserStore.setState(data.user);
</script>

<Navbar isLoggedIn={$isLoggedIn}></Navbar>
<slot />
