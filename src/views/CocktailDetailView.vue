<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchCocktail } from '../api/cocktails'
import { useCartStore } from '../store/cart'

const route = useRoute()
const cocktail = ref<any>(null)
const loading = ref(true)
const selectedSize = ref<string>('')
const quantity = ref<number>(1)
const cart = useCartStore()

onMounted(async () => {
  try {
    const data = await fetchCocktail(Number(route.params.id))
    cocktail.value = data
    selectedSize.value = data.tailles?.[0]?.nom || ''
  } finally {
    loading.value = false
  }
})

function addToCart() {
  if (!cocktail.value || !selectedSize.value) return
  const tailleObj = cocktail.value.tailles.find((t: any) => t.nom === selectedSize.value)
  cart.addItem({
    id: cocktail.value.id,
    nom: cocktail.value.nom,
    taille: selectedSize.value,
    prix: tailleObj?.prix || 0,
    quantity: quantity.value,
  })
  alert(`Ajouté au panier : ${cocktail.value.nom} (${selectedSize.value}) x${quantity.value}`)
}
</script> 

<template>
  <div v-if="loading" class="text-gray-400">Chargement...</div>
  <div v-else-if="cocktail" class="max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-2">{{ cocktail.nom }}</h1>
    <div class="mb-4 text-gray-600">{{ cocktail.description }}</div>
    <div class="mb-4">
      <span class="font-semibold">Tailles :</span>
      <div class="flex gap-2 mt-2">
        <button v-for="taille in cocktail.tailles" :key="taille.nom" @click="selectedSize = taille.nom" :class="[selectedSize === taille.nom ? 'bg-pink-200' : 'bg-gray-100', 'px-3 py-1 rounded']">
          {{ taille.nom }} ({{ taille.prix }} €)
        </button>
      </div>
    </div>
    <div class="mb-4">
      <label for="qty" class="mr-2">Quantité :</label>
      <input id="qty" type="number" min="1" v-model.number="quantity" class="w-16 border rounded px-2 py-1" />
    </div>
    <button class="bg-pink-400 text-white px-6 py-2 rounded hover:bg-pink-500" @click="addToCart">Ajouter au panier</button>
  </div>
  <div v-else class="text-red-500">Cocktail introuvable.</div>
</template>