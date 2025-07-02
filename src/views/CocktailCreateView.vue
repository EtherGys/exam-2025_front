<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createCocktail } from '../api/cocktails'
import { fetchCarteByBarmaker } from '../api/carte'
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

function addIngredient() {
  ingredients.value.push('')
}
function removeIngredient(idx: number) {
  ingredients.value.splice(idx, 1)
}

async function loadCartes() {
  if (auth.user) {
    cartes.value = await fetchCarteByBarmaker()
  }
}

loadCartes()

async function save() {
  loading.value = true
  error.value = ''
  try {
    await createCocktail({
      nom: nom.value,
      description: description.value,
      categories: categories.value,
      ingredients: ingredients.value,
      prixS: prixS.value,
      prixM: prixM.value,
      prixL: prixL.value,
      image: image.value,
      carteId: carteId.value
    })
    router.push('/hub')
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
         
      <h1 class="text-3xl font-bold mb-8">Créer votre nouveau cocktail</h1>
      <form @submit.prevent="save" class="space-y-8">
                  <div class="mb-6 border rounded p-6 border-gray-300">
            <label class="block font-bold mb-1">Carte associée</label>
            <select v-model="carteId" class="w-full border rounded px-3 py-2 bg-[#fcfbfa]">
              <option :value="null" disabled>Choisissez une carte</option>
              <option v-for="carte in cartes" :key="carte.id" :value="carte.id">{{ carte.nom }}</option>
            </select>
          </div>
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
            <label class="block mb-1 font-bold">Catégories</label>
            <div class="flex flex-wrap gap-2">
              <label v-for="cat in categorieOptions" :key="cat" class="flex items-center gap-1">
                <input type="checkbox" :value="cat" v-model="categories" />
                {{ cat }}
              </label>
            </div>
          </div>
        <label class="block font-bold mb-2 mt-4">Les prix</label>
       <div class="grid grid-cols-3 gap-8">
          <div>
            <label class="block font-medium mb-1">Prix S</label>
            <input v-model="prixS" type="currency" class="w-full border rounded px-3 py-2 bg-[#fcfbfa]" />
          </div>
          <div>
            <label class="block font-medium mb-1">Prix M</label>
            <input v-model="prixM" type="currency" class="w-full border rounded px-3 py-2 bg-[#fcfbfa]" />
          </div>
          <div>
            <label class="block font-medium mb-1">Prix L</label>
            <input v-model="prixL" type="currency" class="w-full border rounded px-3 py-2 bg-[#fcfbfa]" />
          </div>
        </div>
        <div class="mt-4">
          <label class="block font-bold mb-2">Ingrédients</label>
          <table class="w-full text-left  overflow-hidden">
            <thead>
              <tr class="bg-[#f5f2ef]">
                <th class="py-2 px-3 font-semibold">Nom</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border rounded p-6" v-for="(ing, idx) in ingredients" :key="idx">
                <td class="p-2"><input v-model="ingredients[idx]" placeholder="Renseignez votre ingrédient" class="w-full bg-transparent  outline-none" /></td>
                <td>
                  <button type="button" @click="removeIngredient(idx)" class="text-red-400 hover:underline text-xs">Retirer</button>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" @click="addIngredient" class="mt-2 text-sm text-[#b48c6e] hover:underline">+ Ajouter un ingrédient</button>
        </div>
            <div>
            <label class="block font-bold mt-4 mb-1">image</label>
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