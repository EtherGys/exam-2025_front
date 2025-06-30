<script setup lang="ts">
import { useCartStore } from '../store/cart'
import { computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

// const cart = useCartStore()
// const totalItems = computed(() => cart.items.reduce((sum, item) => sum + item.quantity, 0))
const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/login')
}
</script> 

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <router-link to="/" class="text-xl font-bold tracking-tight">Mixology</router-link>
      </div>
      <div class="flex items-center gap-6">
        <router-link to="/" class="hover:text-pink-600">Menu</router-link>
        <router-link to="/favorites" class="hover:text-pink-600">Favoris</router-link>
        <router-link to="/orders" class="hover:text-pink-600">Commandes</router-link>
        <router-link to="/cart" class="relative">
          <span class="sr-only">Panier</span>
          <svg class="w-6 h-6 inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span v-if="totalItems > 0" class="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5 shadow">{{ totalItems }}</span>
        </router-link>
        <router-link to="/account" class="ml-2">
          <span class="sr-only">Compte</span>
          <svg class="w-8 h-8 rounded-full bg-gray-100 border border-gray-300" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-4 8-4s8 0 8 4"/></svg>
        </router-link>
        <div v-if="auth.user" class="flex items-center gap-2 ml-4">
          <span class="text-sm font-medium">{{ auth.user.nom }}</span>
          <button @click="logout" class="text-xs text-pink-600 hover:underline">Déconnexion</button>
        </div>
        <div v-else class="flex items-center gap-2 ml-4">
          <router-link to="/login" class="text-sm text-pink-600 hover:underline">Connexion</router-link>
          <router-link to="/register" class="text-sm text-pink-600 hover:underline">Inscription</router-link>
        </div>
      </div>
    </nav>
    <!-- Contenu principal -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <router-view />
    </main>
    <footer class="w-full border-t border-gray-200 bg-white py-4 text-center text-gray-500 text-sm mt-8">
      © 2024 Mixology — Le Bar'app. Tous droits réservés.
    </footer>
  </div>
</template>

