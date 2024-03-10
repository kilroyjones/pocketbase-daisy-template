<script lang="ts">
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import '../app.css';
	import { user } from '$lib/stores/user.store';
	import type { PageData } from './$types';

	export let data: PageData;

	$: user.set(data.user);
</script>

<Navbar></Navbar>
<slot />
