<script setup lang="ts">
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import GradeTable from '@/components/GradeTable.vue';
import { store, type SemesterStructure } from '@/store';
import { onMounted, reactive, ref } from 'vue';

interface Result {
	id: number,
	courses?: Array<Object>,
	title: string,
	total_units: number,
	total_grade_points: number,
	gpa?: number
}

let studentCGPA = ref(0);
let studentGradePoints = ref(0);
let studentUnits = ref(0);
let results = reactive<Array<Result>>([]);

onMounted(() => {
	let grade_points = 0;
	let units = 0;

	console.log(store);

	store.courseStructure.forEach((course: SemesterStructure, i: number) => {
		if (!course.estimate) {
			grade_points += Number(store.semesterResults[i].total_grade_points);
			units += Number(store.semesterResults[i].total_units);
		}
	});

	// store.semesterResults.forEach((semester: Result) => {
	// 	results[index].id = index;
	// 	results[index].title = semester.title;
	// 	results[index].total_units = semester.total_units;
	// 	results[index].total_grade_points = semester.total_grade_points;
	// 	resultsIndex.value += 1;
	// });

	studentCGPA.value = Number((grade_points / units).toFixed(2));
	studentGradePoints.value = grade_points;
	studentUnits.value = units;
});

function calculateCGPA(totalGradePoints: number, totalUnits: number) {
	let grade_points: number = totalGradePoints + studentGradePoints.value;
	let units: number = totalUnits + studentUnits.value;

	studentCGPA.value = Number((grade_points / units).toFixed(2));
}

</script>

<template>
	<main>
		<RouterLink to="/upload-course" class="step-info">
			<IconArrowLeft class="icon" />
			<span>Step 3/3</span>
		</RouterLink>
		<div class="grade-data">
			<p>Estimated CGPA: <span>{{ studentCGPA }}</span></p>
			<p>Total Number of Units: <span>{{ store.numberOfUnits }}</span></p>
			<p>Current CGPA: <span>{{ store.studentCGPA }}</span></p>
		</div>
		<div class="tables">
			<div v-for="semester in store.courseStructure" :key="semester.id">
				<GradeTable :title="semester.title" :courses="semester.courses" v-if="semester.estimate"
					@grade-change="(totalGradePoints, totalUnits) => calculateCGPA(totalGradePoints, totalUnits)" />
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
