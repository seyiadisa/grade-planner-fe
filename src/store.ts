import {reactive} from "vue";

interface CourseResult {
	course_code: string,
	title: string,
	unit: number,
	grade: string,
	grade_point: number
}

interface SemesterResult {
	courses: Array<CourseResult>,
	gpa: number,
	title: string,
	total_grade_points: number,
	total_units: number
}

export interface CourseStructure {
	course_code: string,
	title: string,
	unit: number,
	is_elective: boolean
}

interface SemesterStructure {
	courses: Array<CourseStructure>,
	title: string,
	estimate?: boolean
}

export const store = reactive({
	studentCGPA: sessionStorage.getItem("cgpa") ? Number(sessionStorage.getItem("cgpa")) : 0,
	numberOfUnits: sessionStorage.getItem("units") ? Number(sessionStorage.getItem("units")) : 0,
	semesterResults: sessionStorage.getItem("sem_results") ? JSON.parse(sessionStorage.getItem("sem_results")!) : [<SemesterResult>{}],
	courseStructure: sessionStorage.getItem("structure") ? JSON.parse(sessionStorage.getItem("structure")!) : [<SemesterStructure>{}],
	changeCGPA(cgpa: number) {
		this.studentCGPA = cgpa;
		sessionStorage.setItem("cgpa", this.studentCGPA.toString());
	},
	changeTotalUnits(units: number) {
		this.numberOfUnits = units;
		sessionStorage.setItem("units", this.numberOfUnits.toString());
	},
	updateSemesterResults(sems: Array<SemesterResult>) {
		this.semesterResults = sems;
		sessionStorage.setItem("sem_results", JSON.stringify(this.semesterResults));
	},
	updateCourseStructure(courses: Array<SemesterStructure>) {
		this.courseStructure = courses;
		sessionStorage.setItem("structure", JSON.stringify(this.courseStructure));
	}
});