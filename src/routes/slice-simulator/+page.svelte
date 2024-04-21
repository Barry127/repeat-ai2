<script>
	import { components } from '$lib/slices';
	import { SliceZone } from '@prismicio/svelte';
	import { SliceSimulator } from '@slicemachine/adapter-sveltekit/simulator';
</script>

<SliceSimulator let:slices background="#030712">
	<SliceZone {slices} {components} />
</SliceSimulator>
