<script setup lang="ts">
import { useCartStore } from '../store/cart'
import { computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const totalItems = computed(() => cart.items.reduce((sum, item) => sum + item.quantity, 0))
const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/login')
}
</script> 

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Nouvelle Navigation -->
    <nav class="bg-white border-b border-gray-200 shadow-sm px-12 py-4 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center min-w-[160px]">
        <router-link to="/" class="text-2xl font-bold text-gray-900 tracking-tight select-none">Bar'App</router-link>
      </div>
      <!-- Menu central -->
      <div class="flex-1 flex justify-center">
        <div class="flex gap-8 text-base font-medium text-gray-700">
          <router-link to="/orders" class="hover:text-black transition">Commandes</router-link>
        </div>
      </div>
      <!-- Icônes à droite -->
      <div class="flex items-center gap-6 min-w-[160px] justify-end">
        <!-- Recherche -->
        <button class="focus:outline-none">
          <svg class="w-6 h-6 text-gray-500 hover:text-black transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
        <!-- Panier -->
        <router-link to="/cart" class="relative">
          <svg class="w-6 h-6 text-gray-500 hover:text-black transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span v-if="totalItems > 0" class="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5 shadow">{{ totalItems }}</span>
        </router-link>
        <!-- Avatar utilisateur ou login/register -->
        <div>
          <router-link v-if="auth.user" to="/account" class="inline-block">
            <div class="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
              <span class="text-gray-700 font-semibold text-lg">{{ auth.user.nom.charAt(0).toUpperCase() }}</span>
            </div>
          </router-link>
          <div v-else class="flex gap-2">
            <router-link to="/login" class="text-sm text-gray-600 hover:text-black transition">Connexion</router-link>
            <router-link to="/register" class="text-sm text-gray-600 hover:text-black transition">Inscription</router-link>
          </div>
        </div>
      </div>
    </nav>
    <!-- Contenu principal -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <router-view />
    </main>
    <footer class="w-full border-t border-gray-200 bg-white py-4 text-center text-gray-500 text-sm mt-8">
      © 2025 Le Bar'app - Tous droits réservés.
    </footer>
  </div>
</template>

