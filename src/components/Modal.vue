<script setup lang="ts">
import { ref } from "vue";

let isOpen = ref(true);

function closeModal() {
	isOpen.value = false;
}

function toggleClick(e: any) {
	e.target.classList.toggle("active")
}
</script>

<template>
	<div id="overlay" v-show="isOpen">
		<div id="modal">
			<h1>Semester Estimation</h1>
			<p>Select the semesters you want to start estimating</p>
			<div class="pills">
				<div class="pill" @click="toggleClick">100 level First Semester</div>
				<div class="pill" @click="toggleClick">100 level Second Semester</div>
				<div class="pill" @click="toggleClick">200 level First Semester</div>
				<div class="pill" @click="toggleClick">200 level Second Semester</div>
				<div class="pill" @click="toggleClick">300 level First Semester</div>
				<div class="pill" @click="toggleClick">300 level Second Semester</div>
				<div class="pill" @click="toggleClick">400 level First Semester</div>
				<div class="pill" @click="toggleClick">400 level Second Semester</div>
			</div>
			<button @click="closeModal">Continue</button>
		</div>
	</div>
</template>

<style scoped>
#overlay {
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 10;
}

#modal {
	background-color: var(--color-background);
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 90%;
	padding: 24px 16px;
	border-radius: 12px;
	z-index: 15;
}

#modal h1 {
	color: var(--color-text-blue);
	font-weight: 600;
	font-size: 18px;
	margin-bottom: 6px;
}

#modal>p {
	text-align: center;
}

.icon {
	align-self: end;
}

.pills {
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 12px;
	flex-wrap: wrap;
	width: 100%;
	margin-top: 16px;
}

.pill {
	color: var(--color-text-2);
	padding: 4px 20px;
	border-radius: 42px;
	border: 1px solid var(--color-border);
	text-wrap: nowrap;
}

.active {
	background-color: var(--color-text-blue);
	color: white;
	padding: 4px 20px;
	border-color: var(--color-background);
	border-radius: 42px;
}

button {
	margin-top: 30px;
	background-color: var(--color-text-blue);
	color: #fff;
	border-radius: 40px;
	padding: 4px 40px;
}
</style>