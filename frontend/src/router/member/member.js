
const routes = [
	{

		path: '/member/register',
		name: 'Member register',
		component: () => import('@/views/member/register.vue'),
		meta: {
			admin: false,
			member: false,
		}

	},
	{
		path: '/member/login',
		name: 'Member login',
		component: () => import('@/views/member/login.vue'),
		meta: {
			admin: false,
			member: false,
		}
	},
	{
		path: '/member',
		name: 'Member account',
		component: () => import('@/views/member/member.vue'),
		meta: {
			admin: false,
			member: true,
		}
	},
	{
		path: '/member/settings',
		name: 'Member settings',
		component: () => import('@/views/member/settings.vue'),
		meta: {
			admin: false,
			member: true,
		}
	}
]

export default routes.map(r => {
	return { ...r }
})