<script setup lang="ts">
import IconClose from "@/components/icons/IconClose.vue";
import IconSuccess from "@/components/icons/IconSuccess.vue";
import { ref } from "vue";

let props = defineProps<{
	success: boolean
	isOpen: boolean
}>()

let open = ref(props.isOpen);

function closeAlert() {
	open.value = false;
}
</script>

<template>
	<div id="overlay" v-show="open">
		<div id="toast">
			<IconSuccess class="success-icon" />
			<div>
				<h1>
					<slot name="title"></slot>
				</h1>
				<p>
					<slot name="description"></slot>
				</p>
			</div>
			<IconClose class="close-icon" @click="closeAlert" />
		</div>
	</div>
</template>

<style scoped>
#overlay {
	display: flex;
	position: fixed;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	z-index: 10;
}

#toast {
	position: absolute;
	bottom: 20px;
	border: 1px solid var(--color-border);
	border-radius: 8px;
	background-color: var(--color-background);
	display: flex;
	flex-direction: row;
	padding: 12px 8px 12px 12px;
	gap: 12px;
	align-items: center;
	width: 90%;
	z-index: 15;
}

.success-icon {
	width: 28px;
	height: 28px;
}

.close-icon {
	align-self: flex-start;
}

h1 {
	color: var(--color-text-2);
	font-size: 18px;
	font-weight: 600;
}

p {
	color: var(--color-text-1);
	font-weight: 400;
	font-size: 14px;
}
</style>