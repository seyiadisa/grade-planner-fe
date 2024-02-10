<script setup lang="ts">
import { type CourseStructure } from "@/store";
import { sendJson } from "@/fetch";
import { reactive, ref, onMounted } from "vue";

interface ResponseJSON {
	course_code: string,
	title: string,
	unit: number,
	grade_int: number,
	grade: string
}

const emit = defineEmits(["gradeChange"]);

const props = defineProps<{
	title: string,
	courses: Array<CourseStructure>,
}>();

let coursesArray = reactive(props.courses);
let generated_grades = reactive<Array<ResponseJSON>>([<ResponseJSON>{}]);
let totalUnits = ref(0);
let gpa = ref(0);

/* onMounted(() => {
	coursesArray.forEach((course) => {
		totalUnits.value += course.unit;
	});
	regenerateHandler();
});

function regenerateHandler() {
	let response = sendJson("generate_grades", coursesArray, 5.0);
	response.then(res => {
		generated_grades = res.data.data.patterns[0].generated_grades;
		gpa.value = res.data.data.generated_gpa;
	});
}

function changeGrade(e: Event, index: number) {
	generated_grades[index].grade_int = Number((e.target as HTMLInputElement).value);
	generated_grades[index].grade = (document.getElementsByTagName("option")[(e.target as HTMLSelectElement).selectedIndex] as HTMLOptionElement).textContent!;
	console.log(generated_grades);

	let total = 0;
	let dropdowns = document.getElementsByName("grades");

	dropdowns.forEach((dropdown, i) => {
		if (generated_grades[i]) {

			total += Number((dropdown as HTMLInputElement).value) * generated_grades[i].unit;
		}
	});

	gpa.value = total / totalUnits.value;

	emit("gradeChange", total, totalUnits.value);
} */

</script>

<template>
	<div class="table">
		<div id="container">
			<header>
				<h1>{{ props.title }}</h1>
				<button @click="">Regenerate</button>
			</header>
			<div>
				<span>Course Code</span>
				<span>Units</span>
				<span>Grade</span>
			</div>
			<div v-for="(course, i) in generated_grades" :key="course.course_code">
				<span>{{ course.course_code + "\t" }} </span>
				<span>{{ course.unit }}</span>
				<span>
					<select name="grades" id="grades" :value="course.grade_int">
						<option value="5">A</option>
						<option value="4">B</option>
						<option value="3">C</option>
						<option value="1">D</option>
						<option value="0">F</option>
					</select>
				</span>
			</div>
			<p>GPA: <span>{{ gpa.toFixed(2) }}</span></p>
			<p>Number of Units: <span>{{ totalUnits }}</span></p>
		</div>
	</div>
</template>

<style scoped>
#container {
	border: 2px solid var(--color-border);
	border-radius: 16px;
	background-color: var(--color-background-tile);
	color: var(--color-text-4);
	padding: 20px;
	display: grid;
	margin-bottom: 20px;
	@apply grid-rows-3
}

.table {}

.table th td {
	color: var(--color-text-blue);
}

header h1 {
	color: var(--color-text-blue);
	display: inline;
}

header button {
	background-color: var(--color-text-blue);
	color: #fff;
	display: inline;
}

select {
	border: 2px solid var(--color-border);
	border-radius: 4px;
	background-color: var(--color-background-tile);
}
</style>
