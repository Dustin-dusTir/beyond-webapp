<script lang="ts">
	import LinearProgress from '@smui/linear-progress';
	import IconButton from '@smui/icon-button';
	import { mdiCommentQuestionOutline } from '@mdi/js';
	import { Svg } from '@smui/common/elements';
	import { writable_current_question_state_id } from './testamentgenerator_store';

	let progress = 0.1;

	let generatorSections = [
		'Allgemeine Informationen',
		'Begünstigte',
		'Erbanteile',
		'Vermächtnisse',
		'Testamentvollstreckung',
		'Abschließende Klauseln'
	];
	let numSections = generatorSections.length;
	let activeSection = 0;

	$: {
		// calculate the current section based on the current question id
		let id = parseInt($writable_current_question_state_id);
		if (id < 200) {
			activeSection = 0;
		} else if (id < 300) {
			activeSection = 1;
		} else if (id < 400) {
			activeSection = 2;
		} else if (id < 500) {
			activeSection = 3;
		} else if (id < 900) {
			activeSection = 4;
		} else if (id < 1000) {
			activeSection = 5;
		}
		progress = id / 1000;
	}
</script>

<div class="flex flex-grow">
	<div class="m-32 mdc-elevation--z8 flex flex-grow flex-col rounded-md bg-surface">
		<div class="m-4 flex flex-row">
			{#each generatorSections as section, i}
				<div class="mr-auto {activeSection === i ? 'font-bold' : ''}">{section}</div>
				{#if i < numSections - 1}
					<div class="mr-auto font-extrabold ">></div>
				{/if}
			{/each}
		</div>
		<LinearProgress {progress} {closed} />
		<div class="flex flex-row">
			<span class="text-sm m-2">{progress * 100}%</span>
			<div class="flex-grow" />

			<IconButton component={Svg} viewBox="0 0 24 24" width="5px" height="5px"
				><path fill="currentColor" d={mdiCommentQuestionOutline} />
			</IconButton>
		</div>

		<slot />
	</div>
</div>

<style>
	/* @tailwind utilities;
	@tailwind components; */
</style>
