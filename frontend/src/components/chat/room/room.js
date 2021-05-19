export default {
	name: "view_channel",
	data() {
		return {
			channel: Object,
			messages: [],
			page: 1,
			noScroll: false,
			lastScroll: null,
			me: this.$getUser().id,
			existChannel: false,
			isLoadMessages: false,
			oldMessages: true,
		};
	},
	watch: {
		$route() {
			this.change()
		},
	},
	methods: {
		change() {
			this.messages = [];
			this.page = 1;
			this.noScroll = false;
			this.lastScroll = null;
			this.channel = {
				id: this.$route.params.room
			}
			this.existChannel = false;
			this.isLoadMessages = false;
			this.getMessages();

		},
		sendMessage() {
			let data = document.getElementById("form-message").value;
			if (data) {
				this.$socket.emit("MESSAGE_CREATE", {
					channel: this.channel,
					message: data,
				});
				document.getElementById("form-message").value = "";
			}
		},
		scroll() {
			var div = document.getElementById("view-channel");
			div.scrollTop = div.scrollHeight;
		},
		loadMessages(e) {
			if (e.target.scrollTop === 0) {
				this.page += 1;
				this.noScroll = true;
				this.lastScroll = document.getElementById("view-channel").scrollHeight;
				this.getMessages();
			}
		},
		async getMessages() {
			if (this.isLoadMessages) return; //On ne charge pas si un chargement est déja en cours.
			this.isLoadMessages = true;
			if (!this.oldMessages && this.messages.length) return; //Si il n'y a pas d'anciens messages mais que il y a au moins 1 message
			try {
				const responce = await fetch(
					`${this.$store.state.host}api/v1/chat/messages/${this.channel.id}/${this.page}`, {
					credentials: "include",
					withCredentials: true,
				});
				const result = await responce.json();
				if (result && result.status === "success") {
					if (!result.result.length) this.oldMessages = false;
					let newArray = [];
					for (const msg of result.result) {
						newArray.push({
							author: msg.author,
							content: msg.content,
							member_avatar: msg.member_avatar,
							member_color: msg.member_color,
							member_nickname: msg.member_nickname
						});
					}
					for (const msg of this.messages) {
						newArray.push(msg);
					}
					this.messages = newArray;
				} else throw 'not found'
				this.existChannel = true;
			} catch {
				this.existChannel = false;
			}
			this.isLoadMessages = false;
		},
	},
	beforeMount() {
		this.channel = {
			id: this.$route.params.room
		}
		this.getMessages();
	},
	async updated() {
		if (!this.noScroll) {
			this.scroll();
		} else {
			const el = document.getElementById("view-channel");
			const newStroll = el.scrollHeight;
			const pos = newStroll - this.lastScroll;
			el.scrollTop = pos;
		}
	},
	mounted() {
		this.$socket.on("MESSAGE_CREATE", (data) => {
			if (data.channel === this.channel.id) {
				this.noScroll = false;
				this.messages.push({
					author: data.author,
					content: data.content,
					member_avatar: data.member_avatar,
					member_color: data.member_color,
					member_nickname: data.member_nickname
				});
			}
		});
	},
};