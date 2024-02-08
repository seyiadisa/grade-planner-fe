<script setup lang="ts">
import { type CourseStructure } from "@/store";
import { sendJson } from "@/fetch";
import { reactive, ref, computed, onMounted } from "vue";

const props = defineProps<{
	title: string,
	courses: Array<CourseStructure>
}>();

let coursesArray = reactive(props.courses);
let totalUnits = ref(0);

onMounted(() => {
	// sendJson("generate_grades", coursesArray, 3);
	coursesArray.forEach((course) => {
		totalUnits.value += course.unit;
	});
});

function regenerateHandler() {
	sendJson("generate_grades", coursesArray, 3.4);
}



function calculate(unit: number) {
	totalUnits.value += unit;
}

</script>

<template>
	<div class="table">
		<header>
			<h1>{{ props.title }}</h1>
			<button @click="regenerateHandler">Regenerate</button>
		</header>
		<table>
			<th>
			<td>Course Code</td>
			<td>Units</td>
			<td>Grade</td>
			</th>
			<tr v-for="course in props.courses" :key="course.course_code" @load="() => calculate(course.unit)">
				<td>{{ course.course_code }}</td>
				<td>{{ course.unit }}</td>
				<td>
					<select name="grades" id="grades">
						<option value="5">A</option>
						<option value="4">B</option>
						<option value="3">C</option>
						<option value="1">D</option>
						<option value="0">F</option>
					</select>
				</td>
			</tr>
			<div>
				<p>GPA: <span>{{ }}</span></p>
				<p>Number of Units: <span>{{ totalUnits }}</span></p>
			</div>
		</table>
	</div>
</template>

<style scoped>
.table {
	border: 1px solid var(--color-border);
	border-radius: 16px;
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
</style>
