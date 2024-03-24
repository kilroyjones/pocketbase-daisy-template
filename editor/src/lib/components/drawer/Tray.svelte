<script lang="ts">
	const onDragStart = (event: DragEvent, nodeType: string) => {
		if (!event.dataTransfer) {
			return null;
		}

		event.dataTransfer.setData('application/svelteflow', nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};
</script>

<footer class=" bg-base-100">
	<div class="pb-10 nodes-container">
		<div class="node">
			<div
				class="flex flex-col justify-center p-2.5 border-2 rounded-lg border-accent align-center"
				role="button"
				tabindex="0"
				on:dragstart={(event) => onDragStart(event, 'nodeText')}
				draggable={true}
			>
				Text
			</div>
		</div>

		<div
			class="flex justify-center p-2.5 border-2 rounded-lg border-accent align-center"
			role="button"
			tabindex="0"
			on:dragstart={(event) => onDragStart(event, 'nodeIcon')}
			draggable={true}
		>
			<div class="mr-2">
				<img class="object-cover rounded-md" src="https://placehold.co/24x24" alt="placeholder" />
			</div>

			<div class="flex-grow">
				<p>Icon</p>
			</div>
		</div>

		<div
			class="flex justify-center p-2.5 border-2 rounded-lg border-accent align-center"
			role="button"
			tabindex="0"
			on:dragstart={(event) => onDragStart(event, 'nodeList')}
			draggable={true}
		>
			<label class="p-0 m-0 cursor-pointer">
				<input type="checkbox" checked class="w-2.5 h-2.5 mr-2 checkbox" />
				<span class="label-text">List</span>
			</label>
		</div>

		<div
			class="flex justify-center p-2.5 border-2 rounded-lg border-accent align-center"
			role="button"
			tabindex="0"
			on:dragstart={(event) => onDragStart(event, 'nodeTitle')}
			draggable={true}
		>
			Title
		</div>
	</div>
</footer>

<style>
	footer {
		position: sticky;
		bottom: 0;
		width: 100%;
	}

	.label {
		font-size: 0.9rem;
		text-align: center;
	}

	.nodes-container {
		display: flex;
		overflow-x: auto;
		padding: 0.5rem;
		gap: 0.5rem;
		align-items: center;
		justify-content: flex-start;
	}

	.node {
		flex: 0 0 auto; /* Prevents nodes from stretching. Change as needed */
		padding: 0.5rem 1rem;
		font-weight: 700;
		border-radius: 3px;
		cursor: grab;
		white-space: nowrap;
	}
</style>
