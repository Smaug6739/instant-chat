import Loader from "@/components/common/loader.component.vue";
import ViewChannel from '@/components/chat/room/room.vue'
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

		try {
			const responce = await fetch(`${this.$store.state.host}api/v1/chat/rooms`);
			if (!responce) this.chats = 'none';
			else {
				const result = await responce.json();
				if (result && result.result.length) this.chats = result.result;
			}
		} catch {
			this.chats = 'none';
		}



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
	},
};
