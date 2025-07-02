<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchAllCartes, fetchCarteByBarmaker } from '../api/carte';
import type { Carte } from '../../types/Carte';


const router = useRouter();
const cartes = ref<any[]>([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  loading.value = true;
  try {
    const data: Carte[] = await fetchCarteByBarmaker();
    cartes.value = data.map((carte, idx) => ({
      id: carte.id,
      titre: carte.nom,
      description: carte.description,
      imageUrl:carte.image,
    }));
  } catch (e) {
    error.value = 'Erreur lors du chargement des cartes.';
  } finally {
    loading.value = false;
  }
});

function goToCarte(carteId: number) {
  router.push({ name: 'Menu', params: { id: carteId } });
}
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
         <header class="flex items-center justify-between px-4 py-3 border-b">
      <button @click="$router.back()" aria-label="Retour" class="text-gray-500 text-2xl cursor-pointer">←</button>
      <h1 class="text-lg font-semibold">Retour</h1>
      <div style="width: 2rem"></div>
    </header>
    <main class="flex-1 px-4 py-6">
      <h2 class="text-2xl font-bold mb-6">Vos cartes</h2>
      <div v-if="loading" class="text-gray-400">Chargement...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else class="flex flex-col gap-6">
        <div
        v-for="carte in cartes"
        :key="carte.id"
        class="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border"
        @click="goToCarte(carte.id)"
        >
        <div class="flex-1">
          
          <div class="font-semibold text-lg leading-tight">{{ carte.titre }}</div>
          <div class="text-sm text-gray-500 leading-tight">{{ carte.description }}</div>
        </div>
        <img
        :src="carte.imageUrl"
        alt="Image carte"
        class="w-24 h-24 object-cover rounded-lg border"
        />
      </div>
    </div>
  </main>
</div>
</template>
