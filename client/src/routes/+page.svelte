<script lang="ts">
	import { user } from '$lib/stores/user.store';
</script>

<div>
	{#if $user}
		{$user.username}
	{:else}
		logged out
	{/if}
</div>
