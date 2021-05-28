export default {
	data() {
		return { member: null };
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
	},
	async beforeMount() {
		const res = await fetch(
			`${this.$store.state.host}api/v1/members/${this.$getUser().id}`,
			{
				credentials: "include",
				withCredentials: true,
			}
		);
		const result = await res.json();
		this.member = result.result;
	},
};