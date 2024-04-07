<script lang="ts">
	// Components
	import { MapStore, edges, nodes } from '$lib/stores/map.store';
	import EditorIcon from '$lib/svgs/EditorIcon.svelte';

	let fileInput: HTMLInputElement;

	/**
	 *
	 */
	const exportToFile = () => {
		const mapData = {
			nodes: $nodes,
			edges: $edges
		};

		const dataStr = JSON.stringify(mapData);
		const blob = new Blob([dataStr], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement('a');

		anchor.href = url;
		anchor.download = 'data.json';
		document.body.appendChild(anchor);
		anchor.click();

		setTimeout(() => {
			document.body.removeChild(anchor);
			window.URL.revokeObjectURL(url);
		}, 0);
	};

	/**
	 *
	 */
	const importFromFile = async (event: Event) => {
		const element = event.currentTarget as HTMLInputElement;
		console.log(element);
		if (element.files) {
			const file = element.files[0];
			const reader = new FileReader();
			reader.onload = function (e: ProgressEvent<FileReader>) {
				try {
					const mapData = JSON.parse(e.target?.result as string);
					$nodes = mapData.nodes;
					$edges = mapData.edges;
					MapStore.save();
				} catch (error) {
					console.error('Error parsing JSON:', error);
				}
			};
			reader.onerror = () => {
				console.error('File read error:', reader.error);
			};
			reader.readAsText(file);
		}
	};

	/**
	 *
	 */
	const reset = () => {
		MapStore.resetMap();
	};
</script>

<input
	type="file"
	id="jsonFileInput"
	accept=".json"
	bind:this={fileInput}
	on:change={importFromFile}
	class="hidden"
/>

<div class="pb-3 navbar">
	<div class="justify-between flex-1">
		<a href="/map" class="text-xl btn btn-ghost"><EditorIcon></EditorIcon>Roadmap Editor</a>
		<div class="flex">
			<div class="flex-none pr-4">
				<button class="btn bg-warning" on:click={() => fileInput.click()}>Import</button>
			</div>

			<div class="flex-none pr-4">
				<button class="btn bg-primary" on:click={exportToFile}>Export</button>
			</div>

			<div class="flex-none pr-4">
				<button class="btn bg-error" on:click={reset}>Reset</button>
			</div>
		</div>
	</div>
</div>
