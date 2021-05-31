import Nav from '../nav/nav.component.vue';
import Alert from '@/components/common/alert.component.vue';
export default {
	components: {
		Nav,
		Alert
	},
	data() {
		return {
			member: null,
			hostAvatar: this.$store.state.hostAvatar,
			alert: {
				type: null,
				msg: null
			}
		};
	},
	methods: {
		changeView(newView) {
			this.closeAllViews();
			document.getElementById(newView).classList.remove("none");
		},
		closeAllViews() {
			document.getElementsByClassName("view").forEach((v) => {
				if (v.classList.contains("none")) return;
				v.classList.add("none");
			});
		},
		async updateAccount() {
			const body = new FormData();
			body.append('nickname', document.getElementById("form-username").value)
			body.append('avatar', document.getElementById("form-avatar").files[0])
			body.append('first_name', document.getElementById("form-first_name").value)
			body.append('last_name', document.getElementById("form-last_name").value)
			body.append('phone_number', document.getElementById("form-phone_number").value)
			body.append('email', document.getElementById("form-email").value)
			this.$fetchAPI(`/members/${this.$getUser().id}`, {
				method: "PUT",
				body: body,
			})
				.then(() => {
					this.alert = {
						type: "success",
						msg: "Successfully update your account"
					}
				})
				.catch(() => {
					this.alert = {
						type: "error",
						msg: "An error occurred while updating your account"
					}
				})
		},
		closeAlert() {
			this.alert = {
				type: null,
				msg: null
			}
		}
	},
	async mounted() {
		const res = await this.$fetchAPI(`/members/${this.$getUser().id}`)
		this.member = res

	},

};