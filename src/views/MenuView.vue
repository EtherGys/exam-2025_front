<script setup lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchCarte } from '../api/carte';
import type { Carte } from '../../types/Carte';
import type { Cocktail } from '../../types/Cocktail';
import { useAuthStore } from '@/store/auth'
import { deleteCocktail, updateCocktail } from '../api/cocktails'

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const error = ref('');
const carte = ref<Carte | null>(null);
const cocktails = ref<Cocktail[]>();
const auth = useAuthStore()

const showDeleteModal = ref(false)
const showEditModal = ref(false)
const cocktailToEdit = ref<Cocktail | null>(null)
const cocktailToDelete = ref<Cocktail | null>(null)
const editForm = reactive({
  nom: '',
  image: '',
  prixS: '',
  prixM: '',
  prixL: '',
  categories: [],
  description: '',
  ingredients: [] as string[],
})
const editError = ref('')
const editLoading = ref(false)

onMounted(async () => {
  loading.value = true;
  try {
    const carteId = route.params.id;
    const data: Carte = await fetchCarte(String(carteId));
    carte.value = data;
    cocktails.value = data.cocktails;
  } catch (e) {
    error.value = 'Connectez-vous pour voir le contenu de la carte';
  } finally {
    loading.value = false;
  }
});

function goToCocktail(id: number) {
  router.push(`/cocktail/${id}`);
}

function openDeleteModal(cocktail: Cocktail, e: Event) {
  e.stopPropagation()
  cocktailToDelete.value = cocktail
  showDeleteModal.value = true
}
function closeDeleteModal() {
  showDeleteModal.value = false
  cocktailToDelete.value = null
}
async function confirmDelete() {
  if (!cocktailToDelete.value) return
  await deleteCocktail(cocktailToDelete.value.id)
  cocktails.value = cocktails.value?.filter(c => c.id !== cocktailToDelete.value?.id)
  closeDeleteModal()
}

function openEditModal(cocktail: Cocktail, e: Event) {
  e.stopPropagation()
  cocktailToEdit.value = cocktail
  Object.assign(editForm, {
    nom: cocktail.nom,
    image: cocktail.image,
    prixS: cocktail.prixS,
    prixM: cocktail.prixM,
    prixL: cocktail.prixL,
    categories: cocktail.categories || [],
    description: cocktail.description || '',
    ingredients: cocktail.ingredients ? [...cocktail.ingredients] : [],
  })
  showEditModal.value = true
}
function closeEditModal() {
  showEditModal.value = false
  cocktailToEdit.value = null
  editError.value = ''
}
function addIngredientEdit() {
  editForm.ingredients.push('')
}
function removeIngredientEdit(idx: number) {
  editForm.ingredients.splice(idx, 1)
}
async function saveEdit() {
  if (!cocktailToEdit.value) return
  editLoading.value = true
  editError.value = ''
  try {
    await updateCocktail(cocktailToEdit.value.id, { ...editForm })
    // Met à jour la liste locale
    const idx = cocktails.value?.findIndex(c => c.id === cocktailToEdit.value?.id)
    if (idx !== undefined && idx !== -1 && cocktails.value) {
      cocktails.value[idx] = { ...cocktailToEdit.value, ...editForm }
    }
    closeEditModal()
  } catch (e: any) {
    editError.value = e.message || 'Erreur lors de la modification.'
  } finally {
    editLoading.value = false
  }
}

</script>

<template>
  <div class="w-full md:w-[80%] md:mx-auto  px-4 py-10">
    <header class="flex items-center justify-between px-4 py-3 border-b">
      <button @click="$router.back()" aria-label="Retour" class="text-gray-500 text-2xl cursor-pointer">←</button>
      <h1 class="text-lg font-semibold">Retour au menu</h1>
      <div style="width: 2rem"></div>
    </header>
    <h1 class="text-4xl font-bold mb-2 pt-8">{{ carte?.nom || 'Carte' }}</h1>
    <p class="text-gray-500 mb-8">{{ carte?.barmaker?.nom ? `Carte de ${carte.barmaker.nom}` : '' }}</p>
    
    <div v-if="loading" class="text-gray-400">Chargement...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <h2 class="text-2xl font-semibold mb-4">Cocktails de la carte</h2>
      <div v-if="cocktails?.length === 0" class="text-gray-500">Aucun cocktail dans cette carte.</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div v-for="c in cocktails" :key="c.id" class="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition hover:shadow-md relative" @click="goToCocktail(c.id)">
          <img :src="c.image" :alt="c.nom" class="w-full h-44 object-cover" />
          <div class="p-4">
            <div class="font-semibold text-lg mb-1">{{ c.nom }}</div>
            <div class="text-gray-500 text-sm">{{ c.ingredients?.join(', ') }}</div>
            <template v-if="auth.user === 'BARMAKER'">
              <div class="flex gap-2 mt-4">
                <button @click.stop="openEditModal(c, $event)" class="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Modifier</button>
                <button @click.stop="openDeleteModal(c, $event)" class="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Supprimer</button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Suppression -->
    <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div class="bg-white p-8 rounded shadow max-w-sm w-full">
        <h2 class="text-xl font-bold mb-4">Êtes-vous certain de vouloir supprimer ce cocktail ?</h2>
        <div class="flex justify-end gap-2">
          <button @click="closeDeleteModal" class="px-4 py-2 bg-gray-200 rounded">Annuler</button>
          <button @click="confirmDelete" class="px-4 py-2 bg-red-500 text-white rounded">Supprimer</button>
        </div>
      </div>
    </div>

    <!-- Modal Modification -->
    <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div class="bg-white p-8 rounded shadow max-w-lg w-full">
        <h2 class="text-xl font-bold mb-4">Modifier le cocktail</h2>
        <form @submit.prevent="saveEdit" class="space-y-4">
          <div>
            <label class="block font-medium mb-1">Nom</label>
            <input v-model="editForm.nom" type="text" class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block font-medium mb-1">Description</label>
            <textarea v-model="editForm.description" rows="2" class="w-full border rounded px-3 py-2"></textarea>
          </div>
          <div>
            <label class="block font-medium mb-1">Image</label>
            <input v-model="editForm.image" type="text" class="w-full border rounded px-3 py-2" />
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block font-medium mb-1">Prix S</label>
              <input v-model="editForm.prixS" type="text" class="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label class="block font-medium mb-1">Prix M</label>
              <input v-model="editForm.prixM" type="text" class="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label class="block font-medium mb-1">Prix L</label>
              <input v-model="editForm.prixL" type="text" class="w-full border rounded px-3 py-2" />
            </div>
          </div>
          <div>
            <label class="block font-bold mb-2">Ingrédients</label>
            <div v-for="(ing, idx) in editForm.ingredients" :key="idx" class="flex gap-2 mb-2">
              <input v-model="editForm.ingredients[idx]" placeholder="Ingrédient" class="flex-1 border rounded px-3 py-2" />
              <button type="button" @click="removeIngredientEdit(idx)" class="text-red-400 hover:underline text-xs">Retirer</button>
            </div>
            <button type="button" @click="addIngredientEdit" class="mt-2 text-sm text-blue-600 hover:underline">+ Ajouter un ingrédient</button>
          </div>
          <div v-if="editError" class="text-red-500">{{ editError }}</div>
          <div class="flex justify-end gap-2 mt-4">
            <button type="button" @click="closeEditModal" class="px-4 py-2 bg-gray-200 rounded">Annuler</button>
            <button type="submit" :disabled="editLoading" class="px-4 py-2 bg-blue-500 text-white rounded">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
