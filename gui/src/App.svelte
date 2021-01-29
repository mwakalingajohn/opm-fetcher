<script>
	import Img from "./Img.svelte";
	import Navigation from "./Navigation.svelte";
	import { imageLoading } from "./store/store";

	let loading = false;

	imageLoading.subscribe((val) => {
		loading = val;
	});
</script>

<main class="bg-light h-100 text-center">
	{#if loading}
		<p>Loading...</p>
	{/if}
	<div class="container h-100">
		<div class="container h-100">
			<Img />
		</div>
	</div>
	<Navigation />
</main>

<style>
</style>
