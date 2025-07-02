<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createCocktail } from '../api/cocktails'
import { createCarte, fetchCarteByBarmaker } from '../api/carte'
import { useAuthStore } from '@/store/auth'
import type { Carte } from '../../types/Carte'
import  { CocktailCategorie } from '../../types/Cocktail'

const router = useRouter()
const auth = useAuthStore()

const nom = ref<string>('')
const image = ref<string>('')
const prixS = ref<string>('')
const prixM = ref<string>('')
const prixL = ref<string>('')
const categories = ref<string[]>([])
const categorieOptions = Object.values(CocktailCategorie)
const description = ref<string>('')
const ingredients = ref<string[]>([
])
const loading = ref(false)
const error = ref('')
const carteId = ref<number|null>(null)
const cartes = ref<Carte[]>([])


async function save() {
  loading.value = true
  error.value = ''
  try {
    await createCarte({
      nom: nom.value,
      description: description.value,
      image: image.value,
    })
    router.push('/')
  } catch (e: any) {
    error.value = e.message || 'Erreur lors de la création.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="  bg-[#fcfbfa] rounded-xl overflow-hidden shadow max-w-6xl mx-auto mt-8">
       <header class="flex items-center justify-between px-4 py-3 border-b">
      <button @click="$router.back()" aria-label="Retour" class="text-gray-500 text-2xl cursor-pointer">←</button>
      <h1 class="text-lg font-semibold">Retour</h1>
      <div style="width: 2rem"></div>
    </header>
    <!-- Main -->
    <main class="flex-1 p-10">
      <h1 class="text-3xl font-bold mb-8">Créer votre nouvelle carte</h1>
      <form @submit.prevent="save" class="space-y-8">
        
        <div class="grid grid-cols-2 gap-8">
          <div>
            <label class="block font-medium mb-1">Nom</label>
            <input v-model="nom" type="text" class="w-full border rounded px-3 py-2 bg-[#fcfbfa]" />
          </div>
          <div>
            <label class="block font-medium mb-1">Description</label>
            <textarea v-model="description" rows="3" class="w-full border rounded px-3 py-2 bg-[#fcfbfa]"></textarea>
          </div>
          
        </div>
        <div>
          <label class="block font-medium mb-1">image</label>
          <input v-model="image" type="text" class="w-full border rounded px-3 py-2 bg-[#fcfbfa]" />
        </div>
        <div class="flex justify-end mt-6">
          <button type="submit" :disabled="loading" class="bg-[#e7cfc2] text-[#4b2e1e] px-6 py-2 rounded hover:bg-[#e0bfa3] transition">Créer</button>
        </div>
        <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
      </form>
    </main>
  </div>
</template> 