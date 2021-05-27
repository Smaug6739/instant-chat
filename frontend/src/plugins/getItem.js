export default {
	install: (app) => {
		app.config.globalProperties.getChannels = async function () {
			const channels = this.$store.state.rooms;
			if (channels[0]) {
				return channels;
			} else {
				console.log('else');
				try {
					const responce = await fetch(`${this.$store.state.host}api/v1/chat/rooms`);
					if (!responce) this.chats = "none";
					else {
						const result = await responce.json();
						if (result && result.result.length) this.$store.commit('updateRooms', result.result);
						return result.result;
					}
				} catch {
					return null;
				}
			}
		}
	}
}