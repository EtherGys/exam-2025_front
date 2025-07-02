<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchAllCartes } from '../api/carte';
import type { Carte } from '../../types/Carte';


const router = useRouter();
const cartes = ref<any[]>([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  loading.value = true;
  try {
    const data: Carte[] = await fetchAllCartes();
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
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    
    <main class="flex-1 px-4 py-6">
      <h2 class="text-2xl font-bold mb-6">Les actions possibles</h2>
      <div  class="flex flex-col gap-6 mt-6">
        <div
        class="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border bg-gray-100"
        @click="router.push('/carte/barmaker')"
        >
        <div class="flex-1">
          Consulter mes cartes
        </div>
      </div>
    </div>
    <div  class="flex flex-col gap-6 mt-6">
      <div
      class="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border bg-gray-100"
      @click="router.push('/commandes/barmaker')"
      >
      <div class="flex-1">
        <div class="flex-1">
          Consulter mes préparations
        </div>
      </div>
    </div>
  </div>
  <div  class="flex flex-col gap-6 mt-6">
  <div
  class="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border bg-gray-100"
  @click=" router.push('/carte')"
  >
  <div class="flex-1">
    Créer une carte
  </div>
</div>
</div>
  <div  class="flex flex-col gap-6 mt-6">
    <div
    class="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border bg-gray-100"
    @click="router.push({ name: 'CocktailsCreate'})"
    >
    <div class="flex-1">
      Créer un cocktail
    </div>
  </div>
</div>

</main>
</div>
</template>
