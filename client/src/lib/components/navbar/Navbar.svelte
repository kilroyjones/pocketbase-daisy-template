<script lang="ts">
	import { user } from '$lib/stores/user.store';
	import ToggleLightDarkMode from './ToggleLightDarkMode.svelte';
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="text-xl btn btn-ghost">templateUI</a>
	</div>
	<div class="flex-none">
		<ToggleLightDarkMode></ToggleLightDarkMode>

		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-primary">
				<div class="rounded-full">[USER]</div>
			</div>
			<ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
				<li>Profile</li>
				<li>Settings</li>
				<li>Logout</li>
			</ul>
		</div>
	</div>
</div>
