<Directional> was created with unknown prop 'id'
<Directional> was created with unknown prop 'animated'
<Directional> was created with unknown prop 'selected'
<Directional> was created with unknown prop 'label'
<Directional> was created with unknown prop 'labelStyle'
<Directional> was created with unknown prop 'data'
<Directional> was created with unknown prop 'interactionWidth'
<Directional> was created with unknown prop 'type'
<Directional> was created with unknown prop 'sourceHandleId'
<Directional> was created with unknown prop 'targetHandleId'
<Directional> was created with unknown prop 'markerStart'
			<div class="flex items-center px-2 mt-2 w-ull">
				<input type="checkbox" class="flex mr-2 checkbox checkbox-lg checkbox-accent" />
				<input
					type="text"
					class="flex-grow input input-bordered"
					{id}
					{checked}
					value={text}
					placeholder="Your text here..."
				/>
				<button on:click={() => removeItem(4)} class="flex p-2 btn btn-sm text-secondary">
					X
				</button>
			</div>