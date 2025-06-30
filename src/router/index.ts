import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: HomeView,
  //   },
  //   {
  //     path: '/cocktails',
  //     name: 'cocktails',
  //     // route level code-splitting
  //     // this generates a separate chunk (Cocktails.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import('../views/CocktailsView.vue'),
  //   },
  //   {
  //     path: '/login',
  //     name: 'login',
  //     // route level code-splitting
  //     // this generates a separate chunk (Cocktails.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import('../views/LoginView.vue'),
  //   },
  //   {
  //     path: '/register',
  //     name: 'register',
  //     // route level code-splitting
  //     // this generates a separate chunk (Cocktails.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import('../views/RegisterView.vue'),
  //   },
   ],
})

export default router
