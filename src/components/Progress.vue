<script setup lang="ts">
import { } from "@/fetch"

const props = defineProps<{
	maxValue: number,
	currentValue: number
}>();

</script>

<template>
	<progress :max="maxValue" :value="currentValue">
		<div class="progress-bar">
			<span :style="{ 'width': (currentValue / maxValue) * 100 + '%' }"></span>
		</div>
	</progress>
</template>

<style scoped>
progress[value] {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border: none;
	width: 100%;
	height: 3px;
	color: var(--color-text-blue);
}

progress[value]::-webkit-progress-bar {
	border-radius: 5px;
	background-color: var(--color-text-3);
}

progress[value]::-webkit-progress-value {
	border-radius: 5px;
	background-color: var(--color-text-blue);
}

progress[value]::-moz-progress-bar {
	border-radius: 5px;
	background-color: var(--color-text-blue);
}

.progress-bar {
	width: 100%;
	height: 3px;
	border: 5px;
	display: block;
	position: relative;
	background-color: var(--color-text-3);
}

.progress-bar span {
	height: 3px;
	display: block;
	background-color: var(--color-text-blue);
}
</style>