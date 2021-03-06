import DotsM from '@/components/common/dots-menu.component.vue';
export default {
	name: "view_room",
	components: {
		DotsM
	},
	data() {
		return {
			hostAvatar: this.$store.state.hostAvatar,
			channel: {
				id: this.$route.params.room
			},
			messages: [],
			page: 1,
			noScroll: false,
			lastScroll: null,
			me: this.$getUser().id,
			existChannel: false,
			isLoadMessages: false,
			oldMessages: true,
			docReady: false,
			isUpdateMsg: false,
		};
	},
	watch: {
		$route(to) {
			if (to.params.type != 'room') return;
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
			this.oldMessages = true;
			this.docReady = false;
			this.isUpdateMsg = false;
		},
	},
	methods: {
		sendMessage() {
			let data = document.getElementById("form-message").value;
			if (data) {
				this.$socket.emit("MESSAGE_CREATE", {
					channel: this.channel,
					message: data,
				}, (responce) => {
					if (responce.status !== 'success') {
						const error_msg = document.getElementById('err-msg')
						error_msg.innerHTML = '<p> Une erreur s\'est produite merci de réessayer </p>';
						this.scroll();
						setTimeout(() => {
							error_msg.innerHTML = ''
						}, 5000)
					}
				});
				document.getElementById("form-message").value = "";
			}
		},
		scroll() {
			const div = document.getElementById("view-channel");
			div.scrollTop = div.scrollHeight;
		},
		loadMessages(e) {
			if (e.target.scrollTop === 0) {
				if (!this.docReady) return;
				this.page += 1;
				this.noScroll = true;
				this.lastScroll = document.getElementById("view-channel").scrollHeight;
				this.getMessages();
			}
		},
		async getMessages() {
			const channels = await this.getChannels()
			if (!this.channel.id) return this.$router.push(`/app/room/${channels[0].id}`)
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
					this.docReady = true;
					let newArray = [];
					for (const msg of result.result) {
						newArray.push({
							message_id: msg.id,
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
		//-------------------------------EDIT-------------------------------------
		viewEdit(message_id) {
			const msg = document.getElementById(`edit-${message_id}`)
			msg.classList.remove('none')
		},
		editMessage(message_id) {
			this.$socket.emit("MESSAGE_UPDATE", {
				message_id: message_id,
				channel: this.channel,
				message_content: document.getElementById(`edit-${message_id}`).children[0].value
			}, (responce) => {
				if (responce.status !== 'success') {
					const error_msg = document.getElementById('err-msg')
					error_msg.innerHTML = '<p> Une erreur s\'est produite merci de réessayer </p>';
					this.scroll();
					setTimeout(() => {
						error_msg.innerHTML = ''
					}, 5000)
				}
			});
			this.deleteEdit(message_id)
		},
		deleteEdit(id) {
			const msg = document.getElementById(`edit-${id}`)
			msg.classList.add('none')
		},
		//-------------------------------DELETE-------------------------------------
		deleteMessage(id) {
			this.$socket.emit('MESSAGE_DELETE', {
				channel_id: this.channel.id,
				message_id: id
			}, (responce) => {
				if (responce.status !== 'success') {
					const error_msg = document.getElementById('err-msg')
					error_msg.innerHTML = '<p> Une erreur s\'est produite merci de réessayer </p>';
					this.scroll();
					setTimeout(() => {
						error_msg.innerHTML = ''
					}, 5000)
				}
			});
		}
	},
	async beforeMount() {
		this.getMessages();
	},
	async updated() {
		if (!this.noScroll) { //Scroll to bottom
			this.scroll();
		} else if (!this.isUpdateMsg) {
			const el = document.getElementById("view-channel");
			const newStroll = el.scrollHeight;
			const pos = newStroll - this.lastScroll;
			el.scrollTop = pos;
		}
		this.isUpdateMsg = false;
	},
	mounted() {
		this.$socket.on("MESSAGE_CREATE", (data) => {
			if (data.channel === this.channel.id) {
				this.noScroll = false;
				this.messages.push({
					message_id: data.message_id,
					author: data.author,
					content: data.content,
					member_avatar: data.member_avatar,
					member_color: data.member_color,
					member_nickname: data.member_nickname
				});
			}
		});
		this.$socket.on("MESSAGE_UPDATE", (data) => {
			const indexMsg = this.messages.map(msg => { return msg.message_id }).indexOf(data.message_id)
			if (indexMsg != -1) {
				const msg = this.messages[indexMsg]
				if (this.messages[indexMsg].author == this.me) this.isUpdateMsg = true;
				msg.content = data.message_content
			}
		});
		this.$socket.on("MESSAGE_DELETE", (data) => {
			const indexMsg = this.messages.map(msg => { return msg.message_id }).indexOf(data.message_id)
			if (indexMsg != -1) this.messages.splice(indexMsg, 1)
		});
	},
};