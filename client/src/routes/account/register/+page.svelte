<script>
	import { enhance } from '$app/forms';
	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
</script>

<div class="flex flex-col items-center justify-center min-h-screen -mt-20">
	<div class="w-full max-w-md px-8 py-6 mt-4 text-left">
		<h3 class="text-2xl font-bold text-center">Register</h3>

		<form action="?/register" class="gap-2 p-4 rounded form-control" use:enhance method="POST">
			<div>
				<input
					type="text"
					placeholder="Username"
					name="username"
					class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1"
					bind:value={username}
				/>
			</div>

			<div class="mt-4">
				<input
					type="email"
					placeholder="Email"
					name="email"
					class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1"
					bind:value={email}
				/>
			</div>

			<div class="mt-4">
				<input
					type="password"
					placeholder="Password"
					name="password"
					class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1"
					bind:value={password}
				/>
			</div>

			<div class="mt-4">
				<input
					type="password"
					placeholder="Confirm Password"
					name="confirmPassword"
					class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1"
					bind:value={confirmPassword}
				/>
			</div>

			<div class="flex items-center justify-between mt-4">
				<button
					class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
					>Sign Up</button
				>
			</div>
		</form>
	</div>
</div>

<style>
	/* You can add additional global styles if needed */
</style>
