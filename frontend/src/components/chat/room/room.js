export default {
	name: "view_channel",
	props: {
		channel: [Object],
	},
	data() {
		return {
			messages: [],
			isLoadgin: false,
			page: 1,
			noScroll: false,
			lastScroll: null,
			me: 7,
		};
	},
	watch: {
		$route(to) {
			this.$emit("updateRoom", { id: to.params.room });
		},
		channel: function () {
			this.messages = [];
			this.page = 1;
			this.getMessages();
			this.noScroll = false;
			this.lastScroll = null;
		},
	},
	methods: {
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
			if (e.target.scrollTop === 0 && !this.isLoadgin) {
				this.page += 1;
				this.noScroll = true;
				this.lastScroll = document.getElementById("view-channel").scrollHeight;
				this.getMessages();
			}
		},
		async getMessages() {
			console.log("get");
			this.isLoadgin = true;
			const responce = await fetch(
				`${this.$store.state.host}api/v1/chat/messages/${this.channel.id}/${this.page}`,
				{
					credentials: "include",
					withCredentials: true,
				}
			);
			const result = await responce.json();
			if (result && result.status === "success") {
				let newArray = [];
				for (const msg of result.result) {
					newArray.push({ content: msg.content, author: msg.author });
				}
				for (const msg of this.messages) {
					newArray.push(msg);
				}
				this.messages = newArray;
			}
			this.isLoadgin = false;
		},
	},
	beforeMount() {
		this.getMessages("first");
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
				this.messages.push({ content: data.message });
			}
		});
	},
};