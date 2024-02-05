<script setup lang="ts">
import Accordion from "@/components/Accordion.vue";
import IconUpload from "@/components/icons/IconUpload.vue";
import IconPdf from "@/components/icons/IconPdf.vue";
import { uploadResult } from "@/fetch";
import { ref } from "vue";

let file = ref<File | undefined>(undefined);
let isDragOver = ref(false);

function dropFile(e: DragEvent): void {
	let upload;
	e.preventDefault()
	upload = e.dataTransfer?.files[0];
	file.value = upload;
	// if (upload?.size? > 1048576)
	// 	alert()
}

function uploadFile(e: any): void {
	e.preventDefault();
	file.value = e.target.files[0];
}

function dragOverHandler() {
	!isDragOver.value;
}

</script>

<template>
	<main>
		<div class="step-info">
			<span>Step 1/3</span>
			<span>Do not have a result yet? <a>skip</a></span>
		</div>
		<Accordion>
			<template #title>Upload Result</template>
			<template #description>Upload results for past semesters</template>
			<template #content>
				<div class="content" :class="{ 'dark-fill': isDragOver }" @dragenter="dragOverHandler"
					@dragleave="dragOverHandler" @dragover.prevent @drop.prevent @drop="dropFile">
					<IconUpload />
					<p>Choose a file or drag & drop it here</p>
					<label for="file">
						<div>Browse Files</div>
					</label>
					<input id="file" name="file" type="file" accept=".pdf" @change="uploadFile" />
				</div>
				<div class="upload" v-show="file">
					<span>
						<IconPdf class="icon" />
						{{ file?.name }}
					</span>
				</div>
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

.content p {
	margin-bottom: 12px;
}

label[for="file"] div {
	border: 1px solid var(--color-border);
	border-radius: 16px;
	padding: 10px 20px;
}

input[type="file"] {
	display: none;
}

button[type="submit"] {
	background-color: var(--color-text-blue);
	align-self: end;
	padding: 8px 20px;
	border-radius: 32px;
	color: white;
	margin-top: 24px;
}

.upload {
	background-color: var(--color-background-accordion);
	padding: 10px 20px;
	border-radius: 8px;
}

.dark-fill {
	background-color: var(--color-background-mute);
	border-radius: 8px;
}

.icon {
	width: 24px;
	height: 24px;
	display: inline;
	margin-right: 10px;
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
