<script setup lang="ts">
import Accordion from "@/components/Accordion.vue";
import Upload from "@/components/Upload.vue";
import Alert from "@/components/Alert.vue";
import { store } from "@/store";
import { ref } from "vue";
import router from "@/router";

let filePresent = ref(false);
let showFailAlert = ref(false);
let showUploadFail = ref(false);
let showBadResponse = ref(false);

function popupFail() {
	showFailAlert.value = true;
}

function uploadFail() {
	showUploadFail.value = true;
}

function badResponse() {
	showBadResponse.value = true;
}

function uploadDone() {
	router.push("/upload-course");
}

function submitDetails(e: Event) {
	e.preventDefault();
	let myForm = document.forms.namedItem("cgpa-form");
	let cgpaInput = Number(myForm?.getElementsByTagName("input")[0].value);
	let unitInput = Number(myForm?.getElementsByTagName("input")[1].value);

	if ((cgpaInput < 0) || (cgpaInput > 5)) {
		alert("Invalid CGPA");
	} else if (unitInput < 0) {
		alert("Invalid number of units");
	} else {
		store.changeCGPA(cgpaInput);
		store.changeTotalUnits(unitInput);
		router.push("/upload-course");
	}
}

</script>

<template>
	<main>
		<div class="step-info">
			<span>Step 1/3</span>
			<span>Do not have a result yet? <RouterLink to="/upload-course" class="link">skip</RouterLink></span>
		</div>
		<Accordion @open="">
			<template #title>Upload Result</template>
			<template #description>Upload results for past semesters</template>
			<template #content>
				<Upload page="result" @file-too-large="popupFail" @file-added="filePresent = true"
					@file-removed="filePresent = false" @upload-failed="uploadFail" @bad-response="badResponse" />
				<div class="panel-units">
					<div class="cgpa-units" v-if="store.numberOfUnits > 0">
						<div>
							<span>Student CGPA:</span>
							<span>{{ store.studentCGPA }}</span>
						</div>
						<div>
							<span>Total Number of Units:</span>
							<span>{{ store.numberOfUnits }}</span>
						</div>
					</div>
					{{ console.log(store) }}
					<button :class="{ inactive: (!filePresent && store.numberOfUnits <= 0) }"
						:disabled="!filePresent && store.numberOfUnits <= 0" @click="uploadDone">Continue</button>
				</div>
			</template>
		</Accordion>

		<Accordion @open="">
			<template #title>Manual Entry</template>
			<template #description>Manually enter CGPA and units for past semesters</template>
			<template #content>
				<form class="content" name="cgpa-form" id="cgpa-form" @submit="submitDetails">
					<label for="cgpa-input">Student CGPA</label>
					<input type="number" id="cgpa-input" name="cgpa-input" min="0" max="5" step="0.01" required />
					<label for="unit-input">Total Number of Units</label>
					<input type="number" id="unit-input" name="unit-input" min="0" step="1" required />
					<button type="submit">Continue</button>
				</form>
			</template>
		</Accordion>
	</main>

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
	<aside></aside>
</template>

<style scoped>
main {
	margin: 20px;
}

.step-info {
	color: var(--color-text-1);
	@apply flex flex-row justify-between my-8
}

.link {
	color: var(--color-link);
}

button {
	background-color: var(--color-text-blue);
	align-self: end;
	padding: 8px 20px;
	border-radius: 32px;
	color: white;
	margin-top: 24px;
}

form.content {
	text-align: center;
	padding: 15px;
	@apply flex flex-col items-start
}

form.content label {
	margin-top: 10px;
	color: var(--color-text-4);
}

input[type="number"] {
	border: 1px solid var(--color-border);
	width: 100%;
	border-radius: 4px;
	margin-top: 4px;
	padding: 8px;
	background-color: var(--color-background-tile);
}

.panel-units {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;
	margin: 15px;
}

.cgpa-units {
	margin-bottom: 20px;
}

.cgpa-units>div {
	display: block;
	/* margin-left: 24px;
	 */
	align-self: flex-end;
	text-align: right;
}

.cgpa-units>div>span:first-child {
	color: var(--color-text-blue);
	font-size: 16px;
	font-weight: 400;
}

.cgpa-units>div>span:last-child {
	color: var(--color-text-blue);
	font-size: 16px;
	font-weight: 500;
	margin-left: 8px;
}

.inactive {
	background-color: var(--color-inactive);
	margin-top: 0;
}
</style>
