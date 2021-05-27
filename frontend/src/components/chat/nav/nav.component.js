import BtnBurger from "@/components/common/btn-burger.component.vue";
import FriendsIcon from "@/components/icons/friends.vue";
import ChatsIcon from "@/components/icons/chats.vue";
import SettingsIcon from "@/components/icons/settings.vue";

export default {
	name: "Nav",
	components: {
		BtnBurger,
		FriendsIcon,
		ChatsIcon,
		SettingsIcon
	},
	methods: {
		openNav() {
			document.getElementById("nav-no-mobile").classList.add("none");
			const btn = document.getElementById("btn-burger");
			if (btn.classList.contains("is-opened")) {
				btn.classList.add("is-closed");
				btn.classList.remove("is-opened");
				document.getElementById("user-container").classList.add("none");
			} else {
				document.getElementById("nav-no-mobile").classList.remove("none");
				btn.classList.remove("is-closed");
				btn.classList.add("is-opened");
				document.getElementById("user-container").classList.remove("none");
			}
		},
	},
};