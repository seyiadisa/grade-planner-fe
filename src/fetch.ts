const baseUrl = "https://grade-planner-be.onrender.com/api/v1/";

export function sendFile(endpoint: string ,file: File) {
  let formdata = new FormData();
  formdata.append("file", file);
  
  return fetch(baseUrl + endpoint, {
    method: "POST",
    body: formdata
  });
}

export function sendJson(endpoint: string) {
  return fetch(baseUrl + endpoint, {
    method: "POST",
    
  });
}

export function printUrl() {

  console.log(baseUrl);
}