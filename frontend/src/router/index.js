import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import memberRoutes from './member/member';
import chatRoutes from './auth/chat';

import { getCookie } from '../util/functions';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      admin: false,
      member: false,
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404 not found',
    component: () => import('../views/404.vue'),
    meta: {
      public: true
    }
  },
]
  .concat(memberRoutes)
  .concat(chatRoutes)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, _, next) => {
  const authenticated = getCookie('user_auth')
  const needAuth = to.matched.some(record => record.meta.auth)
  if (needAuth && !authenticated) {
    return next({
      path: '/member/login',
      query: { redirect: to.fullPath }
    })
  }
  next()
})
export default router
