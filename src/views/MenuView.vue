<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchCarte } from '../api/carte';
import type { Carte } from '../../types/Carte';
import type { Cocktail } from '../../types/Cocktail';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const error = ref('');
const carte = ref<Carte | null>(null);
const cocktails = ref<Cocktail[]>();

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
        <div v-for="c in cocktails" :key="c.id" class="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition hover:shadow-md" @click="goToCocktail(c.id)">
          <img :src="'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'" :alt="c.nom" class="w-full h-44 object-cover" />
          <div class="p-4">
            <div class="font-semibold text-lg mb-1">{{ c.nom }}</div>
            <div class="text-gray-500 text-sm">{{ c.ingredients?.join(', ') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
