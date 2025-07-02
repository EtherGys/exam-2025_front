<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createCocktail } from '../api/cocktails'

const router = useRouter()

const nom = ref('')
const categorie = ref('')
const description = ref('')
const ingredients = ref([
  { nom: '', quantite: '', unite: '' },
])
const loading = ref(false)
const error = ref('')

function addIngredient() {
  ingredients.value.push({ nom: '', quantite: '', unite: '' })
}
function removeIngredient(idx: number) {
  ingredients.value.splice(idx, 1)
}

async function save() {
  loading.value = true
  error.value = ''
  try {
    await createCocktail({
      nom: nom.value,
      description: description.value,
      categorie: categorie.value,
      ingredients: ingredients.value,
    })
    router.push('/menu')
  } catch (e: any) {
    error.value = e.message || 'Erreur lors de la création.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex h-[80vh] bg-[#fcfbfa] rounded-xl overflow-hidden shadow max-w-6xl mx-auto mt-8">
    <!-- Sidebar -->
    <aside class="w-72 border-r bg-white p-8 flex flex-col">
      <h2 class="text-2xl font-bold mb-8">Menu</h2>
      <nav class="flex flex-col gap-2">
        <div class="flex gap-4 border-b pb-2 mb-4">
          <span class="font-semibold border-b-2 border-[#e7cfc2] pb-1">Cocktails</span>
          <span class="text-gray-400">Ingredients</span>
          <span class="text-gray-400">Categories</span>
        </div>
        <div class="relative mb-4">
          <input type="text" placeholder="Search" class="w-full rounded-full bg-[#f5f2ef] px-4 py-2 text-sm outline-none" />
        </div>
        <ul class="flex-1 overflow-y-auto">
          <li v-for="c in ['Martini','Mojito','Whiskey Sour','Cosmopolitan','Pina Colada']" :key="c" class="flex items-center justify-between px-2 py-2 rounded hover:bg-[#f5f2ef] cursor-pointer">
            <div>
              <div class="font-medium">{{ c }}</div>
              <div class="text-xs text-gray-400">Description du {{ c }}</div>
            </div>
            <span class="text-gray-400">&gt;</span>
          </li>
        </ul>
      </nav>
    </aside>
    <!-- Main -->
    <main class="flex-1 p-10">
      <h1 class="text-3xl font-bold mb-8">Martini</h1>
      <form @submit.prevent="save" class="space-y-8">
        <div class="grid grid-cols-2 gap-8">
          <div>
            <label class="block font-medium mb-1">Name</label>
            <input v-model="nom" type="text" class="w-full border rounded px-3 py-2 bg-[#fcfbfa]" />
          </div>
          <div>
            <label class="block font-medium mb-1">Category</label>
            <input v-model="categorie" type="text" class="w-full border rounded px-3 py-2 bg-[#fcfbfa]" />
          </div>
        </div>
        <div>
          <label class="block font-medium mb-1">Description</label>
          <textarea v-model="description" rows="3" class="w-full border rounded px-3 py-2 bg-[#fcfbfa]"></textarea>
        </div>
        <div>
          <label class="block font-bold mb-2">Ingredients</label>
          <table class="w-full text-left border rounded overflow-hidden">
            <thead>
              <tr class="bg-[#f5f2ef]">
                <th class="py-2 px-3 font-semibold">Ingredient</th>
                <th class="py-2 px-3 font-semibold">Quantity</th>
                <th class="py-2 px-3 font-semibold">Unit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ing, idx) in ingredients" :key="idx">
                <td><input v-model="ing.nom" class="w-full bg-transparent border-b outline-none" /></td>
                <td><input v-model="ing.quantite" class="w-16 bg-transparent border-b outline-none" /></td>
                <td><input v-model="ing.unite" class="w-16 bg-transparent border-b outline-none" /></td>
                <td>
                  <button type="button" @click="removeIngredient(idx)" class="text-red-400 hover:underline text-xs">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" @click="addIngredient" class="mt-2 text-sm text-[#b48c6e] hover:underline">+ Add Ingredient</button>
        </div>
        <div class="flex justify-end">
          <button type="submit" :disabled="loading" class="bg-[#e7cfc2] text-[#4b2e1e] px-6 py-2 rounded hover:bg-[#e0bfa3] transition">Save Changes</button>
        </div>
        <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
      </form>
    </main>
  </div>
</template> 