
import BarmakerCartesView from '@/views/barmaker/BarmakerCartesView.vue'
import BarmakerCommandesView from '@/views/barmaker/BarmakerCommandesView.vue'
import CarteCreateView from '@/views/CarteCreateView.vue'
import CarteView from '@/views/CarteView.vue'
import CocktailCreateView from '@/views/CocktailCreateView.vue'
import CocktailDetailView from '@/views/CocktailDetailView.vue'
import HubBarmakerView from '@/views/HubBarmakerView.vue'
import MenuView from '@/views/MenuView.vue'
import OrderStatusView from '@/views/OrderStatusView.vue'
import OrdersView from '@/views/OrdersView.vue'
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
      path: '/carte/barmaker',
      name: 'CartesBarmaker',
      component: BarmakerCartesView,
    },
    {
      path: '/cocktail/:id',
      name: 'Cocktails',
      component: CocktailDetailView,
    },
    {
      path: '/cocktail',
      name: 'CocktailsCreate',
      component: CocktailCreateView,
    },
    {
      path: '/commandes/:id',
      name: 'OrderStatus',
      component: OrderStatusView,
    },
    {
      path: '/commandes',
      name: 'Commandes',
      component: OrdersView,
    },
        {
      path: '/commandes/barmaker',
      name: 'CommandesBarmaker',
      component: BarmakerCommandesView,
    },
    {
      path: '/hub',
      name: 'Hub',
      component: HubBarmakerView,
    },
    {
      path: '/carte',
      name: 'CarteCreate',
      component: CarteCreateView,
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
