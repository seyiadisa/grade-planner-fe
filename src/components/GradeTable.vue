<script setup lang="ts">
import { type CourseStructure } from "@/store";
import { sendJson } from "@/fetch";
import { reactive, ref, onMounted } from "vue";

interface ResponseJSON {
  course_code: string;
  title: string;
  unit: number;
  grade_int: number;
  grade: string;
}

const emit = defineEmits(["gradeChange"]);

const props = defineProps<{
  title: string;
  courses: Array<CourseStructure>;
}>();

let dropdownName = ref(props.title.split(" ").join(""));
let coursesArray = reactive(props.courses);
let generated_grades = reactive<Array<ResponseJSON>>([<ResponseJSON>{}]);
let totalUnits = ref(0);
let gpa = ref(0);

onMounted(() => {
  let totalSemesterUnits: number = 0;

  coursesArray.forEach((course) => {
    totalSemesterUnits += course.unit;
  });

  totalUnits.value = totalSemesterUnits;
  regenerateHandler();
});

function regenerateHandler() {
  let response = sendJson("generate_grades", coursesArray, 5);
  response.then((res) => {
    generated_grades = res.data.data.patterns[0].generated_grades;
    gpa.value = res.data.data.generated_gpa;
  });
}

function changeGrade(e: Event, index: number) {
  let totalGradePoints = 0;
  let dropdowns = document.getElementsByName(dropdownName.value);

  generated_grades[index].grade_int = Number(
    (e.target as HTMLInputElement).value,
  );
  generated_grades[index].grade = (
    document.getElementsByTagName("option")[
      (e.target as HTMLSelectElement).selectedIndex
    ] as HTMLOptionElement
  ).textContent!;

  dropdowns.forEach((dropdown, i) => {
    if (generated_grades[i]) {
      totalGradePoints +=
        Number((dropdown as HTMLInputElement).value) * generated_grades[i].unit;
    }
  });

  gpa.value = totalGradePoints / totalUnits.value;

  emit("gradeChange", totalGradePoints, totalUnits.value);
}
</script>

<template>
  <div class="container">
    <header>
      <h1>{{ props.title }}</h1>
      <button type="button" @click="regenerateHandler">Regenerate</button>
    </header>
    <div class="table">
      <span class="table-header">Course Code</span>
      <span class="table-header">Units</span>
      <span class="table-header">Grade</span>
      <span class="row-separator"></span>
      <template
        v-for="(course, i) in generated_grades"
        :key="course.course_code"
      >
        <span>{{ course.course_code + "\t" }} </span>
        <span>{{ course.unit }}</span>
        <span>
          <select
            :name="dropdownName"
            :id="dropdownName"
            :value="course.grade_int"
            @change="(e) => changeGrade(e, i)"
          >
            <option value="5">A</option>
            <option value="4">B</option>
            <option value="3">C</option>
            <option value="2">D</option>
            <option value="0">F</option>
          </select>
        </span>
        <span class="row-separator"></span>
      </template>
    </div>
    <p>
      GPA: <span>{{ gpa.toFixed(2) }}</span>
    </p>
    <p>
      Number of Units: <span>{{ totalUnits }}</span>
    </p>
  </div>
</template>

<style scoped>
.container {
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background-color: var(--color-background-tile);
  color: var(--color-text-4);
  padding: 20px;
  margin-bottom: 20px;
}

.table {
  display: grid;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  justify-items: center;
  margin-bottom: 20px;
  @apply grid-cols-3 gap-y-3;
}

.table-header {
  color: var(--color-text-blue);
  font-weight: 500;
}

.table span {
  font-size: 14px;
}

.table .row-separator {
  grid-column: 1 / -1;
  border: 1px solid #f1f5f9;
  width: 100%;
  margin: 0;
}

header {
  margin-bottom: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

header h1 {
  color: var(--color-text-blue);
  font-weight: 500;
  font-size: 16px;
}

header button {
  background-color: var(--color-text-blue);
  color: #fff;
  padding: 6px 15px;
  border-radius: 32px;
  width: auto;
  align-self: flex-end;
}

select {
  border: 1px solid #f1f5f9;
  padding: 2px;
  border-radius: 4px;
  background-color: var(--color-background-tile);
}

.container > p {
  margin-top: 8px;
  text-align: right;
  font-size: 14px;
}

.container > p > span {
  color: var(--color-text-blue);
  font-weight: 500;
}

@media (min-width: 640px) {
  .container {
    width: 40%;
    padding: 24px;
  }

  header {
    text-align: left;
    padding: 0 15px;
    margin-bottom: 32px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
  }

  header h1 {
    font-size: 18px;
  }

  header button {
    margin-right: 0;
  }

  .table span {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
}
</style>
