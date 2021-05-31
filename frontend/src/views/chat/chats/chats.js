import Loader from "@/components/common/loader.component.vue";
import ViewChannel from '@/components/chat/room/room.vue'
import AccountSettings from '@/components/member/settings/settings.component.vue';
import FriendsScreen from '@/components/chat/friends/friends.component.vue';

import RoomsList from '@/components/chat/nav_rooms/nav_rooms.component.vue';
import Nav from '@/components/chat/nav/nav.component.vue';
export default {
	name: "Chats list",
	data() {
		return {
			chats: null,
			channel: {
				id: null,
			},
			type: this.$route.params.type
		};
	},
	components: {
		Loader,
		ViewChannel,
		RoomsList,
		Nav,
		AccountSettings,
		FriendsScreen
	},
	watch: {
		$route(to) {
			this.type = to.params.type;
		}
	},
	async beforeMount() {
		try {
			const responce = await fetch(
				`${this.$store.state.host}api/v1/chat/rooms`
			);
			if (!responce) this.chats = "none";
			else {
				const result = await responce.json();
				if (result && result.result.length) this.$store.commit('updateRooms', result.result)
			}
		} catch {
			this.chats = "none";
		}
	},
};
