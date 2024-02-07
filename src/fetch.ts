import axios, { type AxiosProgressEvent } from "axios";

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

export function sendJson(endpoint: string) {
  }
