import chats from '@/views/chat/chats/chats.vue';
const routes = [
	{
		path: '/chats/:room',
		name: 'List of chats',
		component: chats,
		meta: {
			admin: false,
			member: false,
		}
	},
]

export default routes.map(r => {
	return { ...r }
})