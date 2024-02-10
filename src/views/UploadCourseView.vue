<script setup lang="ts">
import Upload from "@/components/Upload.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import Modal from "@/components/Modal.vue";
import Alert from "@/components/Alert.vue";
import { ref } from "vue";
import { store } from "@/store";

let showFailAlert = ref(false);
let showSuccessAlert = ref(false);
let showUploadFail = ref(false);
let showBadResponse = ref(false);
let openModal = ref(false);

function popupFail() {
	showFailAlert.value = true;
}

function popupSuccess() {
	showSuccessAlert.value = true;
}

function uploadFail() {
	showUploadFail.value = true;
}

function badResponse() {
	showBadResponse.value = true;
}


function submitFile() {
	openModal.value = true;
}

</script>

<template>
	<Modal :open="openModal" @close-modal="openModal = false" />
	<main>
		<RouterLink to="/upload-result" class="step-info">
			<IconArrowLeft class="icon" />
			<span>Step 2/3</span>
		</RouterLink>
		<div class="content">
			<p>Upload Course Structure</p>
			<span>Upload semester registrations for each semester or manually enter course details with grade and credit
				information</span>
			<Upload page="course_structure" @file-too-large="popupFail" @upload-failed="uploadFail"
				@bad-response="badResponse" @upload-success="popupSuccess" />
			<button @click="submitFile" :class="{ inactive: !(store.courseStructure.length > 1) }"
				:disabled="!(store.courseStructure.length > 1)">Continue</button>
		</div>
	</main>

	<Alert :success="true" :is-open="showSuccessAlert" @close-alert="showSuccessAlert = false">
		<template #title>Upload Successful!</template>
		<template #description>Your course structure has been successfully uploaded</template>
	</Alert>

	<Alert :success="false" :is-open="showFailAlert" @close-alert="showFailAlert = false">
		<template #title>Upload Failed!</template>
		<template #description>File is too large</template>
	</Alert>

	<Alert :success="false" :is-open="showUploadFail" @close-alert="showUploadFail = false">
		<template #title>Upload Failed!</template>
		<template #description>There was a problem contacting the server</template>
	</Alert>

	<Alert :success="false" :is-open="showBadResponse" @close-alert="showBadResponse = false">
		<template #title>Upload Failed!</template>
		<template #description>There was a problem with the file you uploaded. Are you sure it is your result?</template>
	</Alert>
</template>

<style scoped>
main {
	margin: 20px;
}

.step-info {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	display: inline;
	font-size: 14px;
	color: var(--color-text-1);
}

.icon {
	display: inline;
	height: 16px;
	width: 16px;
	margin-right: 15px;
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 10px;
	margin-top: 20px;
}

.content p {
	color: var(--color-text-blue);
	font-weight: 600;
	font-size: 16px;
}

.content span {
	color: var(--color-text-1);
	font-weight: 400;
	font-size: 14px;
}

.content button {
	background-color: var(--color-text-blue);
	color: white;
	padding: 8px 50px;
	border-radius: 32px;
}

.inactive {
	background-color: var(--color-inactive) !important;
}

@media (min-width: 640px) {
	main {
		margin: 40px;
	}
}
</style>
