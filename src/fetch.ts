import axios, { type AxiosProgressEvent } from "axios";
import { type CourseStructure } from "./store";

interface RequestJSON {
  course_code: string,
  title: string,
  unit: number
}

const baseURL = "https://grade-planner-be.onrender.com/api/v1/";
const control = new AbortController();
const signal = control.signal;

const instance = axios.create({
  baseURL,
});

export const controller = control;

export function sendFile(endpoint: string ,file: File, upload?: ((e: AxiosProgressEvent) => void), download? : ((e: AxiosProgressEvent) => void)) {
  return instance.post(endpoint, {
    signal,
    file
  }, {
    onUploadProgress: upload,
    onDownloadProgress: download,
    headers: {
      'Content-Type': "multipart/form-data"
    }
  })
}

export function sendJson(endpoint: string, courses: Array<CourseStructure>, target_cgpa: number) {
  let coursesArr: Array<RequestJSON> = [];

  courses.forEach(course => {
    coursesArr.push({
      course_code: course.course_code,
      title: course.title,
      unit: course.unit
    });
  });

  return instance.post(endpoint, {
    signal,
    semester: {
      courses: coursesArr
    },
    target_cgpa
  }, {
    headers: {
      'Content-Type': "application/json"
    }
  })
}
