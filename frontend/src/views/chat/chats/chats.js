import Loader from "@/components/common/loader.component.vue";
import ViewChannel from '@/components/chat/view_channel.vue'

export default {
	name: "Chats list",
	data() {
		return {
			chats: null,
			channel: {
				id: null,
				type: null,
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
	},
	methods: {
		viewRoom(id, type) {
			this.channel = {
				id: id,
				type: type
			}
		}
	}
};