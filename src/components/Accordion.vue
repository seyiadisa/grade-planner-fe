<script setup lang="ts">
import IconArrowUp from "@/components/icons/IconArrowUp.vue"
import IconArrowDown from "@/components/icons/IconArrowDown.vue"
import { ref } from "vue"

let isOpen = ref<boolean>(false);

function openAccordion(): void {
	isOpen.value = !isOpen.value;
}

</script>

<template>
	<div class="accordion">
		<button @click="openAccordion">
			<span>
				<slot name="title"></slot>
			</span>
			<span>
				<slot name="description"></slot>
			</span>
			<span>
				<IconArrowUp class="icon" v-if="isOpen" />
				<IconArrowDown class="icon" v-else />
			</span>
		</button>
		<div class="panel" v-show="isOpen">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<style scoped>
.accordion {
	border: 1px solid var(--color-border);
	border-radius: 8px;
	width: 100%;
	margin-bottom: 20px;
}

button {
	background-color: var(--color-background-accordion);
	border-radius: 8px;
	padding: 12px 12px;
	width: 100%;
	font-size: 14px;
	@apply flex flex-row justify-center items-center gap-3
}

button span:first-child {
	color: var(--color-text-blue);
}

button span:nth-child(2) {
	color: var(--color-text-1);
	font-weight: 400;
}

button .icon {
	width: 24px;
	height: 24px;
}
</style>