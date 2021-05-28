export default {
	install: (app) => {
		app.config.globalProperties.$fetchAPI = async function (url, options) {
			return new Promise((resolve, reject) => {
				try {
					fetch(this.$store.state.host + url, {
						method: options && options.method ? options.method : "GET",
						data: options && options.data ? options.data : "",
						credentials: "include",
						withCredentials: true,
					}).then(res => {
						res.json()
							.then(result => resolve(result))
							.catch(() => reject('e'))
					})
				} catch (e) {
					reject(e)
				}
			})
		}
	},
}

