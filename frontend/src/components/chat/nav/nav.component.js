import BtnBurger from "@/components/common/btn-burger.component.vue";

export default {
	name: "Chats list",
	data() {
		return {
			chats: null,
			user: null,
		};
	},
	components: {
		BtnBurger,
	},
	async beforeMount() {
		try {
			const responce = await fetch(
				`${this.$store.state.host}api/v1/chat/rooms`
			);
			if (!responce) this.chats = "none";
			else {
				const result = await responce.json();
				if (result && result.result.length) this.chats = result.result;
			}
		} catch {
			this.chats = "none";
		}
		this.user = this.$getUser();
	},
	methods: {
		openNav() {
			document.getElementById("nav-channels").classList.add("none-mobile");
			const btn = document.getElementById("btn-burger");
			if (btn.classList.contains("is-opened")) {
				btn.classList.add("is-closed");
				btn.classList.remove("is-opened");
				document.getElementById("user-container").classList.add("none-mobile");
			} else {
				document.getElementById("nav-channels").classList.remove("none-mobile");
				btn.classList.remove("is-closed");
				btn.classList.add("is-opened");
				document.getElementById("user-container").classList.remove("none-mobile");
			}
		},
		openCollapsible(id) {
			const collapsible = document.getElementById(id)
			collapsible.classList.toggle("active");
			const content = document.getElementById(`content-${id}`)
			if (content.style.maxHeight) {
				content.style.maxHeight = null;
				const arrow = document.getElementById(`cat-arrow-${id}`)
				arrow.classList = 'cat-closed-a'
			} else {
				const arrow = document.getElementById(`cat-arrow-${id}`)
				arrow.classList = 'cat-opened-a'
				content.style.maxHeight = content.scrollHeight + "px";
			}
		}
	},
};