<script setup lang="ts">
import Upload from "@/components/Upload.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import Modal from "@/components/Modal.vue";
import Alert from "@/components/Alert.vue";

function submitFile() {

}

</script>

<template>
	<Modal />
	<main>
		<RouterLink to="/upload-result" class="step-info">
			<IconArrowLeft class="icon" />
			<span>Step 2/3</span>
		</RouterLink>
		<div class="content">
			<p>Upload Course Structure</p>
			<span>Upload semester registrations for each semester or manually enter course details with grade and credit
				information</span>
			<Upload />
			<button @click="submitFile">Continue</button>
		</div>
	</main>

	<Alert :success="false" :is-open="true">
		<template #title>Upload Successful!</template>
		<template #description>Your course structure has been successfully uploaded</template>
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
</style>
