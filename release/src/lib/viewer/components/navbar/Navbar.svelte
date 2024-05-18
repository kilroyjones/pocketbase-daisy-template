<script lang="ts">
	// Components
	import LoggedIn from './LoggedIn.svelte';
	import LoggedOut from './LoggedOut.svelte';

	// Types and variables
	import { user } from '$lib/stores/user.store';
</script>

<div class="navbar">
	<div class="justify-between flex-1">
		<a href="/">
			<img src="/logo-small.png" alt="Home logo" />
		</a>
	</div>

	<div class="flex">
		<div class="flex-none">
			<ul class="p-0 menu menu-horizontal">
				<li><a href="/maps">Learning maps</a></li>
				<li class="ml-3 mr-2 border-l-2 border-solid border-b-gray-500">&nbsp;</li>
			</ul>
		</div>

		{#if $user}
			{#if $user.avatar}
				<LoggedIn avatar={$user.avatar}></LoggedIn>
			{:else if $user.avatarUrl}
				<LoggedIn avatar={$user.avatarUrl}></LoggedIn>
			{:else}
				<LoggedIn avatar={undefined}></LoggedIn>
			{/if}
		{:else}
			<LoggedOut></LoggedOut>
		{/if}
	</div>
</div>
