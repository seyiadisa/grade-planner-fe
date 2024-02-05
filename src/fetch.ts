let baseUrl: string = "https://tipease-tcidl.ondigitalocean.app/api/v1"

export function uploadResult(file: File) {
		return fetch(baseUrl + "/result", {
			method: 'POST',

		});
	}