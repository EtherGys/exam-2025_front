import CarteView from '@/views/CarteView.vue'
import CocktailDetailView from '@/views/CocktailDetailView.vue'
import MenuView from '@/views/MenuView.vue'
import OrderStatusView from '@/views/OrderStatusView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Cartes',
      component: CarteView,
    },
    {
      path: '/carte/:id',
      name: 'Menu',
      component: MenuView,
    },
    {
      path: '/cocktail/:id',
      name: 'Cocktails',
      component: CocktailDetailView,
    },
    // {
    //   path: '/commandes',
    //   name: 'cocktails',
    //   component: CocktailDetailView,
    // },
    {
      path: '/commandes:id',
      name: 'cocktails',
      component: OrderStatusView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
   ],
})

export default router
