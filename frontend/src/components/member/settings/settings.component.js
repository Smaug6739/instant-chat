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
			const responce = await fetch(`${this.$store.state.host}api/v1/members/${this.$getUser().id}`, {
				method: "PUT",
				credentials: "include",
				withCredentials: true,
				body: body,
			});
			const result = await responce.json();
			if (result.status === "success") {
				this.alert = {
					type: "success",
					msg: "Successfully update your account"
				}
			} else {
				this.alert = {
					type: "alert",
					msg: "An error occurred while updating your account"
				}
			}
		}
	},
	async beforeMount() {
		const res = await fetch(
			`${this.$store.state.host}api/v1/members/${this.$getUser().id}`, {
			credentials: "include",
			withCredentials: true,
		});
		const result = await res.json();
		this.member = result.result;
	},
};