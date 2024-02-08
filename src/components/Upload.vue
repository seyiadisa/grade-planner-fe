<script setup lang="ts">
import IconUpload from "@/components/icons/IconUpload.vue";
import IconPdf from "@/components/icons/IconPdf.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import { controller, sendFile } from "@/fetch"
import { store } from "@/store";
import { ref } from "vue";
import { type AxiosProgressEvent } from "axios";

const props = defineProps<{
	page: string
}>();
const emit = defineEmits(["fileTooLarge", "fileAdded", "fileRemoved", "uploadFailed", "badResponse", "uploadSuccess"]);

let file = ref<string | null>(sessionStorage.getItem(props.page));
let isDragOver = ref(false);

function uploadProgress(e: AxiosProgressEvent) {
	const { bytes } = e;
	let fileSize = JSON.parse(sessionStorage.getItem(props.page)!).size;

	let sizeBytes = Math.ceil(bytes / 1024);
	fileSize = Math.ceil(fileSize / 1024);

	// console.log(`${sizeBytes} of ${fileSize}`);
}

function uploadFile(files: FileList | undefined | null) {
	if (files && files?.length > 0) {
		if (files[0].size <= 1048576) {
			sessionStorage.setItem(props.page, JSON.stringify({
				name: files[0].name,
				size: files[0].size
			}));
			file.value = sessionStorage.getItem(props.page);
			emit("fileAdded");

			if (props.page == "result") {
				uploadResult(files[0]);
			} else if (props.page == "course_structure") {
				uploadCourseStructure(files[0]);
			}
		} else {
			emit("fileTooLarge");
		}
	}
}

function uploadResult(file: File) {
	sendFile(props.page, file, uploadProgress).then(res => {
		store.changeCGPA(res.data.data.cgpa);
		store.changeTotalUnits(res.data.data.total_units);
		store.updateSemesterResults(res.data.data.semesters);
	}).catch(err => {
		if (err.response && err.response.status == 422) {
			emit("badResponse");
		} else {
			emit("uploadFailed");
		}
	});
}

function uploadCourseStructure(file: File) {
	sendFile(props.page, file, uploadProgress).then(res => {
		store.updateCourseStructure(res.data.data);
		emit("uploadSuccess");
	}).catch(err => {
		if (err.response && err.response.status == 422) {
			emit("badResponse");
		} else {
			emit("uploadFailed");
		}
	});
}

function removeFile() {
	controller.abort();
	sessionStorage.removeItem(props.page);
	emit("fileRemoved");
	file.value = null;
}

function dropFile(e: DragEvent): void {
	e.preventDefault();

	isDragOver.value = false;
	uploadFile(e.dataTransfer?.files);
}

function chooseFile(e: Event): void {
	uploadFile((e.target as HTMLInputElement).files);
}

function dragOverHandler(e: Event) {
	e.preventDefault();
	isDragOver.value = true;
}

function dragLeaveHandler(e: Event) {
	e.preventDefault();
	isDragOver.value = false;
}
</script>

<template>
	<div class="content" :class="{ 'dark-fill': isDragOver }" @dragover="dragOverHandler" @dragleave="dragLeaveHandler"
		@dragover.prevent @drop.prevent @drop="dropFile">
		<IconUpload class="upload-icon" />
		<p>Choose a file or drag & drop it here</p>
		<p>PDF files up to 1 MB</p>
		<label for="file">
			<div>Browse Files</div>
		</label>
		<input id="file" name="file" type="file" accept=".pdf" @change="chooseFile" />
	</div>
	<div class="upload" v-show="file">
		<span>
			<IconPdf class="icon" />
			<span>
				{{ file ? JSON.parse(file).name : "" }}
			</span>
			<button @click="removeFile">
				<IconTrash class="icon-trash" />
			</button>
		</span>
	</div>
</template>

<style scoped>
.content {
	text-align: center;
	padding: 15px;
	color: var(--color-text-1);
	@apply flex flex-col items-center
}

.content p {
	margin-bottom: 12px;
}

label[for="file"] div {
	border: 1px solid var(--color-border);
	border-radius: 16px;
	padding: 10px 20px;
	color: var(--color-text-4);
}

input[type="file"] {
	display: none;
}

.upload {
	background-color: var(--color-background-accordion);
	padding: 20px 10px;
	border-radius: 8px;
	width: 95%;
	margin: auto;
	color: var(--color-text-4);
}

.upload>span {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	flex-wrap: nowrap;
}

.upload>span>span {
	flex-grow: 2;
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

.icon-trash {
	width: 20px;
	height: 20px;
}

@media (min-width: 640px) {
	.content {
		border: 2px dashed var(--color-border);
		margin: 30px;
		border-radius: 16px;
		padding: 40px;
	}
}
</style>