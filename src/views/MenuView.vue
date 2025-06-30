<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchCarte } from '../api/cocktails'

const categories = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await fetchCarte()
    categories.value = data.categories || data // selon structure du back
  } finally {
    loading.value = false
  }
})
</script> 

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Cocktail Menu</h1>
    <div v-if="loading" class="text-gray-400">Chargement...</div>
    <div v-else>
      <div v-for="categorie in categories" :key="categorie.id" class="mb-8">
        <h2 class="text-xl font-semibold mb-2">{{ categorie.nom }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="cocktail in categorie.cocktails" :key="cocktail.id" class="bg-white rounded-lg shadow p-4">
            <div class="font-bold">{{ cocktail.nom }}</div>
            <div class="text-sm text-gray-500">{{ cocktail.description }}</div>
            <router-link :to="`/cocktail/${cocktail.id}`" class="text-pink-600 hover:underline text-sm">Voir</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
