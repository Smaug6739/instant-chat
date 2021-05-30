//import chats from '@/views/chat/chats/chats.vue';
const routes = [
	{
		path: '/app/:type/:room?',
		name: 'List of chats',
		component: import('@/views/chat/chats/chats.vue'),
		meta: {
			admin: false,
			member: false,
			auth: true,
		}
	},
]

export default routes.map(r => {
	return { ...r }
})