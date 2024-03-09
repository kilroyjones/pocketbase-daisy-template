<script>
	import { enhance } from '$app/forms';

	let email = '';
	let password = '';
</script>

<div class="flex flex-col items-center justify-center min-h-screen -mt-20">
	<div class="w-full max-w-md px-8 py-6 mt-4 text-left">
		<h3 class="text-2xl font-bold text-center">Login</h3>
		<form action="?/login" class="gap-2 p-4 rounded form-control" use:enhance method="POST">
			<div>
				<label for="email" class="block">Email</label>
				<input
					type="email"
					placeholder="Email"
					name="email"
					class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1"
					bind:value={email}
				/>
			</div>

			<div class="mt-4">
				<label for="password" class="block">Password</label>
				<input
					type="password"
					placeholder="Password"
					name="password"
					class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1"
					bind:value={password}
				/>
			</div>
			<div class="flex items-center justify-between mt-4">
				<button
					class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
					>Login</button
				>
			</div>
		</form>
	</div>
</div>

<style>
	/* You can add additional global styles if needed */
</style>
