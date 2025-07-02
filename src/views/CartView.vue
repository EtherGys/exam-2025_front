<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '../store/cart'
import { createCommande } from '../api/commandes'
import type { Commande } from '../../types/Commande'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

function updateQuantity(item: any, quantity: number) {
  if (quantity < 1) return
  cart.updateQuantity(item.id, item.taille, quantity)
}

function removeItem(item: any) {
  cart.removeItem(item.id, item.taille)
}

const total = computed(() => cart.items.reduce((sum, item) => sum + item.prix * item.quantity, 0))

async function checkout() {
  if (cart.items.length === 0) return
  // Adapter la structure selon le backend
  const payload: Commande = {
    lignesDeCommande: cart.items.map(item => ({
      cocktailId: item.id,
      taille: item.taille,
      quantite: item.quantity,
      prixTaille: item.prix
    }))
  }
  try {
    const res = await createCommande(payload)
    cart.resetCart()
    // Supposons que res.id est l'identifiant de la commande créée
    router.push({ name: 'OrderStatus', params: { id: res.id } })
  } catch (e) {
    alert('Erreur lors de la commande')
  }
}
</script> 

<template>
  <div class="md:w-[80%] md:m-auto">
    <h1 class="text-2xl font-bold mb-2">Votre Panier</h1>
    <div v-if="cart.items.length === 0" class="text-gray-400">Votre panier est vide.</div>
    <div v-else>
      <div v-for="item in cart.items" :key="item.id + '-' + item.taille" class="flex items-center justify-between bg-white rounded shadow p-4 mb-4">
        <div>
          <div class="font-semibold">{{ item.nom }} <span class="text-xs text-gray-500">({{ item.taille }})</span></div>
          <div class="text-sm text-gray-500">{{ item.prix }} €</div>
        </div>
        <div class="flex items-center gap-2">
          <button @click="updateQuantity(item, item.quantity - 1)" :disabled="item.quantity <= 1" class="px-2 py-1 bg-gray-100  rounded border border-gray-300">-</button>
          <input type="string"  v-model.number="item.quantity" @change="updateQuantity(item, item.quantity)" class="w-12  h-8 rounded border border-gray-300 text-center" />
          <button @click="updateQuantity(item, item.quantity + 1)" class="px-2 py-1 bg-gray-100  rounded border border-gray-300">+</button>
        </div>
        <button @click="removeItem(item)" class="text-red-500 hover:underline ml-4">Supprimer</button>
      </div>
      <div class="text-right font-semibold mt-6">
        Total : {{ total }} €
      </div>
      <button class="w-full md:w-45 bg-pink-200 text-gray-800 font-semibold py-3 rounded-full text-lg hover:bg-pink-300 transition" @click="checkout" :disabled="cart.items.length === 0">Commander</button>
    </div>
  </div>
</template>