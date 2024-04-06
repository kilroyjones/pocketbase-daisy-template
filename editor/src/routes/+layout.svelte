<script lang="ts">
	// Components
	import Tray from '$lib/components/drawer/Tray.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';

	// Types and constants
	import '../app.css';
</script>

<Navbar></Navbar>
<slot />
