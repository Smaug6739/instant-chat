import Loader from "@/components/common/loader.component.vue";
import ViewChannel from '@/components/chat/room/room.vue'
import RoomsList from '@/components/chat/nav/nav.component.vue';
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
		RoomsList,
	},
};
