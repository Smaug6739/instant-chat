
async function fetchAPI(host, url, options) {
	if (!url) return;
	try {
		const responce = await fetch(`${host}api/v1${url}`, {
			method: options?.method ? options.method : "GET",
			body: options?.body ? options.body : null,
			credentials: "include",
			withCredentials: true,
		})
		const result = await responce.json();
		return result.result
	} catch {
		return null
	}

}







export default {
	install: (app) => {
		app.config.globalProperties.$fetchAPI = async function (url, options) {
			const timeout = new Promise((_, reject) => {
				setTimeout(() => {
					reject(new Error('TIMEOUT'))
				}, 2000)
			})
			return await Promise.race([fetchAPI(this.$store.state.host, url, options), timeout])
		}
	},
}

