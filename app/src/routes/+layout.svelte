<script lang="ts">
	// Components
	import EditorNavbar from '$lib/editor/components/navbar/Navbar.svelte';
	import ViewerNavbar from '$lib/viewer/components/navbar/Navbar.svelte';
	import Content from '$lib/viewer/components/content/Content.svelte';

	// Types and variables
	import { mode, showContent } from '$lib/stores/ui.store';
	import '../app.css';
</script>

{#if $mode == 'editor'}
	<EditorNavbar></EditorNavbar>
{:else}
	<ViewerNavbar></ViewerNavbar>
	{#if $showContent == true}
		<Content></Content>
	{/if}
{/if}
<slot />
