import Loader from "@/components/common/loader.component.vue";
import ViewChannel from '@/components/chat/room/view_channel.vue'
import BtnBurger from "@/components/common/btn-burger.component.vue";
export default {
	name: "Chats list",
	data() {
		return {
			chats: null,
			channel: {
				id: null,
			},
		};
	},
	components: {
		Loader,
		ViewChannel,
		BtnBurger
	},
	async beforeMount() {
		const responce = await fetch(`${this.$store.state.host}api/v1/chat/rooms`);
		const result = await responce.json();
		this.chats = result.result;
		this.channel.id = window.location.href.split('/').reverse()[0]
	},
	methods: {
		updateRoom(payload) {
			this.channel = {
				id: payload.id
			}
		},
		openNav() {
			document.getElementById("nav-channels").classList.add('none')
			const btn = document.getElementById('btn-burger')
			if (btn.classList.contains('is-opened')) {
				btn.classList.add('is-closed')
				btn.classList.remove('is-opened');
			} else {
				document.getElementById("nav-channels").classList.remove('none')
				btn.classList.remove('is-closed')
				btn.classList.add('is-opened');
			}
		},

		/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
		closeNav() {
			document.getElementById("nav-channels").classList.add('none')
		}

	},

};
