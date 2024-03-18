<script lang="ts">
	const onDragStart = (event: DragEvent, nodeType: string) => {
		if (!event.dataTransfer) {
			return null;
		}

		event.dataTransfer.setData('application/svelteflow', nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};
</script>

<footer class="bg-neutral">
	<div class="label">You can drag these nodes to the pane below.</div>
	<div class="pb-10 nodes-container">
		<!-- Example Node, replicate this `div` for more nodes -->
		<div
			role="button"
			tabindex="0"
			class="text-white node"
			on:dragstart={(event) => onDragStart(event, 'titleNode')}
			draggable={true}
		>
			Title Node
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
		white-space: nowrap; /* Keeps the text in a single line */
	}
</style>
