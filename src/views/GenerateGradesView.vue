<script setup lang="ts">
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import GradeTable from '@/components/GradeTable.vue';
import { store } from '@/store';
</script>

<template>
	<main>
		<RouterLink to="/upload-course" class="step-info">
			<IconArrowLeft class="icon" />
			<span>Step 3/3</span>
		</RouterLink>
		<div class="grade-data">
			<p>Estimated CGPA: <span></span></p>
			<p>Total Number of Units: <span>{{ store.numberOfUnits }}</span></p>
			<p>Current CGPA: <span>{{ store.studentCGPA }}</span></p>
		</div>
		<div class="tables">
			<div v-for="semester in store.courseStructure" :key="semester.title">
				<GradeTable :title="semester.title" :courses="semester.courses" v-if="semester.estimate" />
			</div>
		</div>
	</main>
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

.grade-data {
	color: var(--color-text-blue);
	font-size: 14px;
	font-weight: 400;
}

.grade-data span {
	font-weight: 500;
}
</style>
