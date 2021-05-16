import Loader from "@/components/common/loader.component.vue";
import ViewChannel from '@/components/chat/view_channel.vue'

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
		ViewChannel
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
		}
	}
};