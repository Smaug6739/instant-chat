import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import memberRoutes from './member/member';
import chatRoutes from './public/chat';

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
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";

  }
  const authenticated = getCookie('user_auth')
  const isPrivateMember = to.matched.some(record => record.meta.member)
  if (isPrivateMember && !authenticated) {
    return next({
      path: '/member/login',
      query: { redirect: to.fullPath }
    })
  }
  if (authenticated && isPrivateMember) {
    return next()
  }
  next()
})
export default router
