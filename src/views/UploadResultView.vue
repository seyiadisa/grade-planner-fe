<script setup lang="ts">
import Accordion from "@/components/Accordion.vue";
import Upload from "@/components/Upload.vue";
import { sendFile } from "@/fetch";


</script>

<template>
	<main>
		<div class="step-info">
			<span>Step 1/3</span>
			<span>Do not have a result yet? <RouterLink to="/upload-course" class="link">skip</RouterLink></span>
		</div>
		<Accordion>
			<template #title>Upload Result</template>
			<template #description>Upload results for past semesters</template>
			<template #content>
				<Upload />
			</template>
		</Accordion>

		<Accordion>
			<template #title>Manual Entry</template>
			<template #description>Manually enter CGPA and units for past semesters</template>
			<template #content>
				<form action="" class="content">
					<label for="cgpa-input">Student CGPA</label>
					<input type="number" id="cgpa-input" />
					<label for="unit-input">Total Number of Units</label>
					<input type="number" id="unit-input" />
					<button type="submit">Continue</button>
				</form>
			</template>
		</Accordion>
	</main>
	<aside></aside>
</template>

<style>
main {
	margin: 20px;
}

.step-info {
	@apply flex flex-row justify-between my-8
}

.content {
	text-align: center;
	padding: 15px;
	@apply flex flex-col items-center
}

.link {
	color: var(--color-link);
}

button[type="submit"] {
	background-color: var(--color-text-blue);
	align-self: end;
	padding: 8px 20px;
	border-radius: 32px;
	color: white;
	margin-top: 24px;
}

form.content {
	align-items: start;
}

form.content label {
	margin-top: 10px;
	color: var(--color-text-blue);
}

input[type="number"] {
	border: 1px solid var(--color-border);
	width: 100%;
	border-radius: 4px;
	margin-top: 4px;
	padding: 8px;
}
</style>
