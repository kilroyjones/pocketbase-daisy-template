<script lang="ts">
	import { goto } from '$app/navigation';

	// Components
	import { MapStore, edges, nodes } from '$lib/stores/map.store';
	import { mode } from '$lib/stores/ui.store';
	import EditorIcon from '$lib/svgs/EditorIcon.svelte';
	import type { MapData } from '$lib/types';
	import Map from '../Map.svelte';

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
	const loadDemo = async () => {
		try {
			const result = await fetch('/roadmaps/llm-draft.json');
			const mapData: MapData = await result.json();
			console.log(mapData);
			if (mapData.nodes || mapData.edges) {
				$nodes = mapData.nodes;
				$edges = mapData.edges;
				MapStore.save();
			}
		} catch (error: any) {
			console.error('Error:', error);
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
		<div class="flex">
			<a href="/map" class="w-64 text-xl btn btn-ghost"><EditorIcon></EditorIcon>Roadmap Editor</a>
			<button
				class="btn bg-warning"
				on:click={() => {
					$mode = 'viewer';
					goto('/viewer');
				}}>Switch to viewer</button
			>
		</div>
		<div class="flex">
			<div class="flex-none pr-4">
				<button class="mr-10 btn btn-secondary" on:click={loadDemo}>Demo</button>
			</div>

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
