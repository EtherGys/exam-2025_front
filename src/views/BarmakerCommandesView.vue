<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Carte } from '../../types/Carte';
import { fetchCommandeByBarmaker } from '@/api/commandes';
import { StatutCommande, type Commande } from '../../types/Commande';


const router = useRouter();
const commandes = ref<any[]>([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  loading.value = true;
  try {
    const data: Commande[] = await fetchCommandeByBarmaker();
    commandes.value = data.filter(c => c.statutCommande != StatutCommande.TERMINEE);
  } catch (e) {
    error.value = 'Erreur lors du chargement des commandes.';
  } finally {
    loading.value = false;
  }
});

function goToOrder(id: string | undefined) {
  if (id != undefined) {
    router.push(`/commandes/${id}`)
  }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString()
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
      <h2 class="text-2xl font-bold mb-6">Vos préparations en cours</h2>
      <div v-if="loading" class="text-gray-400">Chargement...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
     <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(commande, idx) in commandes" :key="idx" class="bg-white rounded-xl shadow-sm overflow-hidden transition hover:shadow-md cursor-pointer" @click="goToOrder(commande.id)">
          <div class="p-4">
            <div class="flex items-center justify-between mb-2">
              <div class="font-semibold text-lg">Préparation du cocktail {{ commande.nomCocktail }}</div>
              <span class="text-xs px-2 py-1 rounded bg-gray-100 border font-medium">{{ commande.statutCocktail }}</span>
              <span class="">Taille : {{ commande.taille }}</span>
              <span class="">Quantité : {{ commande.quantite }}</span>
            </div>
           <!-- <div class="text-gray-500 text-sm mb-2">{{ commande.lignesDeCommande.length }} cocktail(s)</div>
            <ul class="text-sm text-gray-700">
              <li v-for="(ligne, i) in commande.lignesDeCommande" :key="i">
                <span class="font-medium">x{{ ligne.quantite }}</span>
                — {{ ligne.cocktailId }} ({{ ligne.taille }})
                <span v-if="ligne.statutCocktail" class="ml-2 text-xs text-gray-400">[{{ ligne.statutCocktail }}]</span>
              </li>
            </ul> -->
          </div>
        </div>
      </div>
  </main>
</div>
</template>
