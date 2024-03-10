<script lang="ts">
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	// Types and constants
	import type { ActionResult } from '@sveltejs/kit';
	import type { ErrorRegisterUser } from '$lib/types';

	let email = '';
	let password = '';

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const formData = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());
		console.log(result);

		// if (result.type === 'success') {
		// 	await invalidateAll();
		// } else if (result.type == 'failure') {
		// 	errors = result.data as unknown as ErrorRegisterUser;
		// } else {
		// 	// TODO handle other type coming back?
		// }
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen -mt-20">
	<div class="w-full max-w-md px-8 py-6 mt-4 text-left">
		<h3 class="text-2xl font-bold text-center">Login</h3>
		<form action="?/login" class="gap-2 p-4 rounded form-control" on:submit={handleSubmit}>
			<div>
				<label for="email" class="block text-sm font-medium">Email</label>
				<input
					type="email"
					placeholder="Email"
					name="email"
					class="std-input-field"
					bind:value={email}
				/>
			</div>

			<div class="mt-4">
				<label for="password" class="block text-sm font-medium">Password</label>
				<input
					type="password"
					placeholder="Password"
					name="password"
					class="std-input-field"
					bind:value={password}
				/>
			</div>
			<div class="flex justify-center mt-4">
				<button class="px-6 py-2 leading-5 duration-200 transform rounded-md btn btn-primary"
					>Login</button
				>
			</div>
		</form>
	</div>
</div>

<style>
	/* You can add additional global styles if needed */
</style>
