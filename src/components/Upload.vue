<script setup lang="ts">
import IconUpload from "@/components/icons/IconUpload.vue";
import IconPdf from "@/components/icons/IconPdf.vue";
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
	<div class="content" :class="{ 'dark-fill': isDragOver }" @dragenter="dragOverHandler" @dragleave="dragOverHandler"
		@dragover.prevent @drop.prevent @drop="dropFile">
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

<style scoped>
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

@media (min-width: 640px) {
	.content {
		border: 2px dashed var(--color-border);
		margin: 30px;
		border-radius: 16px;
		/* padding: 12px; */
	}
}
</style>