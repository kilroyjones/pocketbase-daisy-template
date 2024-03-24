<script lang="ts">
	import { EdgeStore, edges } from '$lib/stores/edges.store';
	import { NodeStore, nodes } from '$lib/stores/nodes.store';

	NodeStore.init();
	EdgeStore.init();
	console.log($edges.length, $nodes.length);

	$: combinedJson = JSON.stringify(
		{
			nodes: $nodes,
			edges: $edges
		},
		null,
		2
	);
</script>

<pre>{@html combinedJson}</pre>
