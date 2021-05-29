import BtnBurger from "@/components/common/btn-burger.component.vue";
import ArrowSvg from "@/components/common/arrow-svg.component.vue";

export default {
	name: "Chats list",
	data() {
		return {
			hostAvatar: this.$store.state.hostAvatar,
			chats: null,
			user: this.$getUser(),
		};
	},
	components: {
		BtnBurger,
		ArrowSvg
	},
	methods: {
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
		},
	},
	async beforeMount() {
		this.chats = await this.getChannels();
	}
};