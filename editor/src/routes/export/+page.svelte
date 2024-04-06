<script lang="ts">
	import { MapStore, edges, nodes } from '$lib/stores/map.store';
	import { onMount } from 'svelte';

	onMount(() => {
		MapStore.load();
		console.log($nodes, $edges);
	});
</script>
