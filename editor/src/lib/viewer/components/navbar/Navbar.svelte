<script lang="ts">
	import { goto } from '$app/navigation';

	// Components
	import { mode } from '$lib/stores/ui.store';
	import EditorIcon from '$lib/svgs/EditorIcon.svelte';
</script>

<div class="pb-3 navbar">
	<div class="justify-between flex-1">
		<div class="flex">
			<a href="/map" class="w-64 text-xl btn btn-ghost"><EditorIcon></EditorIcon>Roadmap Viewer</a>
			<button
				class="btn bg-warning"
				on:click={() => {
					$mode = 'editor';
					goto('/editor');
				}}>Switch to editor</button
			>
		</div>
		<div class="flex"></div>
	</div>
</div>
