<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchCocktail } from '../api/cocktails'
import { useCartStore } from '../store/cart'
import type { Cocktail } from '../../types/Cocktail';
import {useToast} from 'vue-toast-notification';


enum Taille {
  S = 'S',
  M = 'M',
  L = 'L',
}
const route = useRoute()
const cocktail = ref<Cocktail>()
const loading = ref(true)
const selectedSize = ref<any>({
  taille: '',
  prix: 0
})
const quantity = ref<number>(1)
const cart = useCartStore()

onMounted(async () => {
  try {
    const data = await fetchCocktail(Number(route.params.id))
    cocktail.value = data
  } finally {
    loading.value = false
  }
})

function addToCart() {
  if (!cocktail.value || !selectedSize.value) return
  cart.addItem({
    id: cocktail.value.id,
    nom: cocktail.value.nom,
    taille: selectedSize.value.taille,
    prix: selectedSize.value.prix,
    quantity: quantity.value,
  })
  const $toast = useToast();
  $toast.success('Ajouté au panier !');
}
</script> 

<template>
  <div v-if="loading" class="text-gray-400">Chargement...</div>
  <div v-else-if="cocktail" class="w-full px-6 py-8">
    <header class="flex items-center justify-between px-4 py-3 border-b">
      <button @click="$router.back()" aria-label="Retour" class="text-gray-500 text-2xl cursor-pointer">←</button>
      <h1 class="text-lg font-semibold">Retour à la carte</h1>
      <div style="width: 2rem"></div>
    </header>
    <div class="flex flex-col items-start">
      <h1 class="text-3xl font-bold mb-2">{{ cocktail.nom }}</h1>
      <div class="text-lg text-gray-500 mb-6 w-full">{{ cocktail.description }}</div>
      <div class="w-full flex justify-center mb-8">
        <img :src="cocktail.image" alt="Image du cocktail" class="rounded-xl object-cover w-full h-[400px]" />
      </div>
      <div class="mb-6 w-full">
        <div class="font-semibold mb-2">Taille</div>
        <div class="flex gap-3 mb-4">
          <button @click="selectedSize = {taille: Taille.S, prix: cocktail.prixS}"
          :class="[selectedSize.prix === cocktail.prixS ? 'bg-gray-200 border border-gray-400' : 'bg-white border border-gray-200', 'px-5 py-2 rounded-full text-base font-medium transition']">
          S : {{ cocktail.prixS }} €
        </button>
        <button @click="selectedSize = {taille: Taille.M, prix: cocktail.prixM}"
        :class="[selectedSize.prix === cocktail.prixM ? 'bg-gray-200 border border-gray-400' : 'bg-white border border-gray-200', 'px-5 py-2 rounded-full text-base font-medium transition']">
        M : {{ cocktail.prixM }} €
      </button>
      <button @click="selectedSize = {taille: Taille.L, prix: cocktail.prixL}"
      :class="[selectedSize.prix === cocktail.prixL ? 'bg-gray-200 border border-gray-400' : 'bg-white border border-gray-200', 'px-5 py-2 rounded-full text-base font-medium transition']">
      L : {{ cocktail.prixL }} €
    </button>
  </div>
  <div class="font-semibold mb-2">Quantité</div>
  <input type="number" min="1" v-model.number="quantity" class="w-full border rounded-full px-4 py-2 mb-6" />
  <button class="w-full bg-pink-200 text-gray-800 font-semibold py-3 rounded-full text-lg hover:bg-pink-300 transition" @click="addToCart">
    Ajouter au panier
  </button>
</div>
</div>
</div>
<div v-else class="text-red-500">Cocktail introuvable.</div>
</template>